import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQueryState(key: string, defaultValue: string | null = null) {
	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search);
	const [value, setValue] = useState<string | null>(
		query.get(key) || defaultValue
	);

	useEffect(() => {
		if (value === null && defaultValue !== null) {
			setQueryState(defaultValue);
		}
	}, [defaultValue]);

	const setQueryState = (newValue: string | null) => {
		const newQuery = new URLSearchParams(query);

		if (newValue === null) {
			newQuery.delete(key);
		} else {
			newQuery.set(key, newValue);
		}

		navigate(`${location.pathname}?${newQuery.toString()}`);
		setValue(newValue);
	};

	useEffect(() => {
		function handleNavigation() {
			const updatedQuery = new URLSearchParams(location.search);
			const updatedValue = updatedQuery.get(key) || defaultValue;
			setValue(updatedValue);
		}

		// Assuming you have some way to listen to navigation changes
		// This part is dependent on your router setup
		handleNavigation();

		// Return cleanup function if needed
		return () => {
			// Cleanup code here
		};
	}, [key, location.search, defaultValue]);

	return [value, setQueryState] as const;
}

export default useQueryState;
