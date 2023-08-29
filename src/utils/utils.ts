import axios from 'axios';

export async function getTimeError() {
	const clientSendTime = new Date().getTime();

	try {
		const response = await axios.get('https://www.google.com');
		const serverTime = new Date(response.headers['date']).getTime();
		const clientReceiveTime = new Date().getTime();

		const requestRoundTripTime = clientReceiveTime - clientSendTime;
		const estimatedServerTime = serverTime + requestRoundTripTime / 2;

		const timeDifference = estimatedServerTime - clientReceiveTime;

		console.log(`Server time: ${serverTime}`);
		console.log(`Client time: ${clientReceiveTime}`);
		console.log(`Estimated server time: ${estimatedServerTime}`);
		console.log(`Time difference: ${timeDifference}ms`);

		return timeDifference;
	} catch (error) {
		console.error('An error occurred:', error);

		return 0;
	}
}

export function getRealTime(timeDifference: number) {
	const clientTime = new Date().getTime();
	const currentTime = clientTime + timeDifference;

	return currentTime;
}
