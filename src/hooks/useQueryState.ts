import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQueryState<T extends string | number | boolean>(
	key: string,
	defaultValue: T
) {
	const location = useLocation();
	const navigate = useNavigate();
	const query = useMemo(
		() => new URLSearchParams(location.search),
		[location.search]
	);

	const [value, setValue] = useState<T | null>(
		(query.get(key) as T) || defaultValue
	);

	const setQueryState = useCallback(
		(newValue: T | null) => {
			const newQuery = new URLSearchParams(query);

			if (newValue === null) {
				newQuery.delete(key);
			} else {
				newQuery.set(key, String(newValue));
			}

			navigate(`${location.pathname}?${newQuery.toString()}`);
			setValue(newValue);
		},
		[key, location.pathname, navigate, query]
	);
	useEffect(() => {
		if (value === null && defaultValue !== null) {
			setQueryState(defaultValue);
		}
	}, [defaultValue, setQueryState, value]);

	useEffect(() => {
		function handleNavigation() {
			const updatedQuery = new URLSearchParams(location.search);
			const updatedValue = (updatedQuery.get(key) as T) || defaultValue;
			setValue(updatedValue);
		}

		handleNavigation();

		return () => {
			// Cleanup code here
		};
	}, [key, location.search, defaultValue]);

	return [value, setQueryState] as const;
}

export default useQueryState;
