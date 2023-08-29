import { Apply, EventDeclaration } from '../../../models/Event';
import { Typography } from '@mui/material';
import React from 'react';
import { humanFriendlyTimeDifference } from '../../../utils/utils';
import CircularProgress from '@mui/material/CircularProgress';
import confetti from 'canvas-confetti';
export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	eventId: string;
	applyId: string;
	timeError: number;
	applies: {
		[x: string]: Apply;
	};
	submitterList: [string, Apply][];
}

const EventFieldPage = ({
	event,
	apply,
	eventId,
	applyId,
	timeError,
	applies,
	submitterList,
}: EventFieldPageProps) => {
	const myIndex = submitterList.findIndex((apply) => apply[0] === applyId);

	const [diff, setDiff] = React.useState('');
	React.useEffect(() => {
		try {
			const lastDate =
				submitterList[submitterList.length - 1][1].submitRequestedAt?.toDate();
			if (!lastDate) return;
			setDiff(
				humanFriendlyTimeDifference(lastDate, event?.openAt?.toDate(), false)
			);
		} catch (e) {
			return;
		}
	}, [event?.openAt, submitterList]);

	const submitted = myIndex !== -1;

	React.useEffect(() => {
		if (!submitted) return;

		const triggerConfetti = () => {
			confetti({
				particleCount: 20,
				startVelocity: 20,
				spread: 100,
				origin: {
					x: 0.5,
					y: -0.1,
				},
				scalar: 0.8,
			});
		};

		const intervalId = setInterval(() => {
			triggerConfetti();
		}, 1000);

		return () => {
			if (intervalId) clearTimeout(intervalId);
		};
	}, [submitted]);

	if (!applies)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '75vh',
				}}
			>
				<CircularProgress color="inherit" />
			</div>
		);

	if (myIndex === -1)
		return (
			<div style={{ margin: 24 }}>
				<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
					이벤트가 이미 마감되었습니다...
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					이 이벤트는 {diff}만에 종료되었습니다.
				</Typography>
			</div>
		);

	return (
		<div>
			<Typography sx={{ fontWeight: 'bold', mb: 2 }}>
				{myIndex + 1}번째로 당첨되었습니다!
			</Typography>
		</div>
	);
};

export default EventFieldPage;
