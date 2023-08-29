import { useEffect, useState } from 'react';
import { getTimeError } from '../utils/utils';

const useTimeError = () => {
	const [timeDiff, setTimeDiff] = useState<number | null>(null);

	useEffect(() => {
		const fetchTimeError = async () => {
			const result = await getTimeError();
			setTimeDiff(result);
		};

		fetchTimeError();
	}, []);

	return timeDiff;
};

export default useTimeError;
