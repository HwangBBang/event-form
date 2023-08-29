import React from 'react';

import { useNavigate, useParams } from 'react-router';
import { subscribeEvent, updateApply } from '../db/firestore';
import { EventDeclaration, FieldResponse } from '../models/Event';
import EventFieldPage from './ProgressPage/EventFieldPage';
import { Button } from '@mui/material';

function App() {
	const { eventId = '', applyId = '' } = useParams();

	const [event, setEvent] = React.useState<EventDeclaration | null>(null);
	const [pageIndex, setPageIndex] = React.useState(0);
	React.useEffect(() => {
		if (!eventId) return;
		const unsubscribeGroups = subscribeEvent(eventId, (_events) => {
			setEvent(_events);
		});
		return () => {
			unsubscribeGroups();
		};
	}, [eventId]);

	const [response, setResponse] = React.useState<{ [key in string]: any }>({});

	const goToNextPage = React.useCallback(async () => {
		await updateApply(eventId, applyId, response);
		setPageIndex((prev) => prev + 1);
	}, [applyId, eventId, response]);

	const renderPage = React.useMemo(() => {
		if (!event) return <div>loading...</div>;

		const page = event?.pages[pageIndex];
		switch (page?.type) {
			case 'info':
				return (
					<EventFieldPage
						page={page}
						response={response}
						setResponse={setResponse}
						onNextPage={goToNextPage}
					/>
				);
			case 'fields':
				return (
					<EventFieldPage
						page={page}
						response={response}
						setResponse={setResponse}
					/>
				);
			case 'phoneVerify':
				return <div>phoneVerify</div>;
			case 'payment':
				return <div>payment</div>;
			case 'submit':
				return <div>submit</div>;
			case 'done':
				return <div>done</div>;
			default:
				return <div>loading...</div>;
		}
	}, [event, goToNextPage, pageIndex, response]);

	return (
		<div className="App">
			<div>{renderPage}</div>
		</div>
	);
}

export default App;
