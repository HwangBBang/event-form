import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { Apply, EventDeclaration } from '../../../models/Event';
import { updateApply } from '../../../db/firestore';
import { getTimeError, getRealTime } from '../../../utils/utils';
import useQueryState from '../../../hooks/useQueryState';

export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	eventId: string;
	applyId: string;
}

const EventFieldPage = ({
	event,
	apply,
	applyId,
	eventId,
}: EventFieldPageProps) => {
	const [, setStep] = useQueryState<'input' | 'submit' | 'result'>(
		'step',
		'input'
	);
	const [timeDiff, setTimeDiff] = React.useState<number | null>(null);
	React.useEffect(() => {
		getTimeError().then(setTimeDiff);
	}, []);

	const onSubmit = React.useCallback(async () => {
		const date = new Date();
		date.setTime(getRealTime(timeDiff ?? 0));

		await updateApply(eventId, applyId, {
			submitRequestedAt: date,
		});

		setStep('result');
	}, [applyId, eventId, setStep, timeDiff]);
	return (
		<div>
			<h1>응모하기</h1>
			<p>응모 대기중입니다.</p>
			<Button onClick={() => setStep('input')}>이전</Button>
			<Button onClick={onSubmit}>응모하기</Button>
		</div>
	);
};

export default EventFieldPage;
