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
					아쉽게도 마감되었습니다.
				</Typography>

				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					종료까지 {diff}가 걸렸습니다.
				</Typography>

				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					많은 분들께 선물을 드리지 못하게 되어 아쉽습니다. 그럼에도 저의
					프로젝트를 직접 테스트해주셔서 다시한번 감사의 말씀을 드립니다.
					입력하신 정보는 3시간 내에 파기될 예정입니다.
				</Typography>
			</div>
		);

	return (
		<div
			style={{
				padding: 24,
			}}
		>
			<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
				{myIndex + 1}번째로
			</Typography>
			<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
				당첨되었습니다!
			</Typography>

			<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
				입력하신 정보로 기프티콘 발송을 해드릴 예정입니다. 만약 입력하신 정보가
				올바르지 않다면, 국밥과 깍두기 팀을 방문해주세요.
			</Typography>
		</div>
	);
};

export default EventFieldPage;
