import React from 'react';
import { useParams } from 'react-router';
import {
	subscribeApply,
	updateApplyField,
	useSubscribeEvent,
} from '../../../db/firestore';
import ApplyInputPage from './ApplyInputPage';
import ApplySubmitPage from './ApplySubmitPage';
import ApplyResultPage from './ApplyResultPage';
import useQueryState from '../../../hooks/useQueryState';
import { Apply } from '../../../models/Event';
import CircularProgress from '@mui/material/CircularProgress';
import usePreventReload from '../../../hooks/usePreventReload';
import useTimeError from '../../../hooks/useTimeError';
const ApplyPage = () => {
	usePreventReload('새로고침을 하면 응모가 취소됩니다.');
	const { eventId = '', applyId = '' } = useParams();
	const [step, setStep] = useQueryState<'input' | 'submit' | 'result'>(
		'step',
		'input'
	);

	const [apply, setApply] = React.useState<Apply | null>(null);

	React.useEffect(() => {
		if (!applyId) return;
		const unsubscribeGroups = subscribeApply(eventId, applyId, setApply);
		return () => {
			unsubscribeGroups();
		};
	}, [applyId, eventId]);

	const { applies, appliesCount, event, submitterList, connectersCount } =
		useSubscribeEvent(eventId);

	const timeError = useTimeError() ?? 0;

	if (!event || !apply)
		return (
			<CircularProgress
				color="inherit"
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
		);

	switch (step) {
		case 'input':
			return (
				<ApplyInputPage
					event={event}
					apply={apply}
					onFieldSave={async (field) => {
						await updateApplyField(eventId, applyId, field);
						setStep('submit');
					}}
				/>
			);
		case 'submit':
			return (
				<ApplySubmitPage
					event={event}
					apply={apply}
					applyId={applyId}
					eventId={eventId}
					appliesCount={appliesCount}
					timeError={timeError}
					connectersCount={connectersCount}
				/>
			);
		case 'result':
			return (
				<ApplyResultPage
					event={event}
					apply={apply}
					applyId={applyId}
					eventId={eventId}
					timeError={timeError}
					applies={applies}
					submitterList={submitterList}
				/>
			);
	}
	return <div>{<CircularProgress color="inherit" />}</div>;
};

export default ApplyPage;
