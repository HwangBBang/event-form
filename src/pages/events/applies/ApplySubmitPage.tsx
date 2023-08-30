import React from 'react';
import { Button } from '@mui/material';
import { Apply, EventDeclaration } from '../../../models/Event';
import { updateApply } from '../../../db/firestore';
import { getRealTime, humanFriendlyTimeDifference } from '../../../utils/utils';
import useQueryState from '../../../hooks/useQueryState';
import { Typography } from '@mui/material';
import { serverTimestamp } from 'firebase/firestore';

export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	eventId: string;
	applyId: string;
	appliesCount: number;
	connectersCount: number;
	timeError: number;
}

const EventFieldPage = ({
	event,
	apply,
	applyId,
	eventId,
	appliesCount,
	timeError,
	connectersCount,
}: EventFieldPageProps) => {
	const [, setStep] = useQueryState<'input' | 'submit' | 'result'>(
		'step',
		'input'
	);

	const onSubmit = React.useCallback(async () => {
		const now = getRealTime(timeError);

		if (event.openAt?.toDate().getTime() > now.getTime()) {
			alert('아직 응모가 시작되지 않았습니다.');

			return;
		}

		await updateApply(eventId, applyId, {
			submitRequestedAt: serverTimestamp(),
		});

		setStep('result');
	}, [applyId, event.openAt, eventId, setStep, timeError]);

	const [diff, setDiff] = React.useState('');
	React.useEffect(() => {
		const interval = setInterval(() => {
			try {
				const now = getRealTime(timeError);

				setDiff(humanFriendlyTimeDifference(now, event.openAt.toDate()));
			} catch (e) {
				return;
			}
		}, 30);

		return () => {
			clearInterval(interval);
		};
	}, [event.openAt, timeError]);

	return (
		<div>
			<div style={{ padding: 24 }}>
				<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
					응모하기
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
					이벤트 시간에 맞추어 아래의 응모 버튼을 눌러주세요.
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					<strong>{event.openAt.toDate().toLocaleString()}</strong> 에
					시작됩니다.
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					{diff}
				</Typography>

				<Typography variant="body1" sx={{ mb: 2 }}>
					남은 상품 개수 : {event.limitation - appliesCount}/{event.limitation}
				</Typography>

				<Typography variant="body1" sx={{ mb: 2 }}>
					현재 동시접속자 수 : {connectersCount}
				</Typography>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						variant="contained"
						size="medium"
						onClick={() => setStep('input')}
					>
						이전
					</Button>

					<Button variant="contained" size="medium" onClick={onSubmit}>
						응모
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EventFieldPage;
