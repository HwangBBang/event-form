import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import {
	subscribeApply,
	subscribeEvent,
	updateApplyField,
} from '../../../db/firestore';
import ApplyInputPage from './ApplyInputPage';
import ApplySubmitPage from './ApplySubmitPage';
import ApplyResultPage from './ApplyResultPage';
import useQueryState from '../../../hooks/useQueryState';
import { Apply, EventDeclaration } from '../../../models/Event';

const ApplyPage = () => {
	const { eventId = '', applyId = '' } = useParams();
	const [step, setStep] = useQueryState<'input' | 'submit' | 'result'>(
		'step',
		'input'
	);

	const [event, setEvent] = React.useState<EventDeclaration | null>(null);
	React.useEffect(() => {
		if (!eventId) return;
		const unsubscribeGroups = subscribeEvent(eventId, setEvent);
		return () => {
			unsubscribeGroups();
		};
	}, [eventId]);

	const [apply, setApply] = React.useState<Apply | null>(null);

	React.useEffect(() => {
		if (!applyId) return;
		const unsubscribeGroups = subscribeApply(eventId, applyId, setApply);
		return () => {
			unsubscribeGroups();
		};
	}, [applyId, eventId]);

	if (!event || !apply) return <div>loading...</div>;

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
				/>
			);
		case 'result':
			return (
				<ApplyResultPage
					event={event}
					apply={apply}
					applyId={applyId}
					eventId={eventId}
				/>
			);
	}
	return <div>loading...</div>;
};

export default ApplyPage;
