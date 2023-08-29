import { useEffect } from 'react';

function usePreventReload(message: string) {
	useEffect(() => {
		const handler = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = message;
			return message;
		};

		window.addEventListener('beforeunload', handler);

		return () => {
			window.removeEventListener('beforeunload', handler);
		};
	}, [message]);
}

export default usePreventReload;
