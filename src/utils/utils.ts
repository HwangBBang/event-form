import axios from 'axios';
import moment from 'moment';

export async function getTimeError(): Promise<number> {
	const clientSendTime = new Date().getTime();

	try {
		const response = await axios.get(
			'http://worldtimeapi.org/api/timezone/Etc/UTC'
		);
		const serverTime = new Date(response.data.utc_datetime).getTime();
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

export function humanFriendlyTimeDifference(from: Date, to: Date): string {
	const start = moment(from);
	const end = moment(to);
	const duration = moment.duration(end.diff(start));

	const isPast = end.isBefore(start);

	const years = Math.abs(duration.years());
	const months = Math.abs(duration.months());
	const days = Math.abs(duration.days());
	const hours = Math.abs(duration.hours());
	const minutes = Math.abs(duration.minutes());
	const seconds = Math.abs(duration.seconds());
	const milliseconds = Math.abs(duration.milliseconds());

	const secondsMilliseconds = ((seconds * 1000 + milliseconds) / 1000).toFixed(
		2
	);

	let result = '';

	if (years || months || days || hours || minutes || seconds || milliseconds) {
		if (years) result += `${years}년 `;
		if (months || years) result += `${months}개월 `;
		if (days || months || years) result += `${days}일 `;
		if (hours || days || months || years) result += `${hours}시간 `;
		if (minutes || hours || days || months || years) result += `${minutes}분 `;
		if (seconds || milliseconds || minutes || hours || days || months || years)
			result += `${secondsMilliseconds}초 `;
	}

	result = result.trim() || '동일한 시간';

	return isPast ? `${result} 지남` : `${result} 남음`;
}
