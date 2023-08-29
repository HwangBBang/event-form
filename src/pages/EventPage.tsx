import React from 'react';

import { useNavigate, useParams } from 'react-router';
import { makeApply, subscribeEvent } from '../db/firestore';
import { EventDeclaration } from '../models/Event';
import EventFieldPage from './ProgressPage/EventFieldPage';
import { Button } from '@mui/material';

function App() {
	const { eventId } = useParams();
	const navigate = useNavigate();

	const [event, setEvent] = React.useState<EventDeclaration | null>(null);
	React.useEffect(() => {
		if (!eventId) return;
		const unsubscribeGroups = subscribeEvent(eventId, (_events) => {
			setEvent(_events);
		});
		return () => {
			unsubscribeGroups();
		};
	}, [eventId]);

	const goToNextPage = React.useCallback(async () => {
		if (!eventId) return;
		const applicationId = await makeApply(eventId);
		navigate(`./applies/${applicationId}`);
	}, [navigate, eventId]);

	if (!event) return <div>loading...</div>;

	return (
		<div className="App">
			<p>{event.title}</p>
			<p>{event.description}</p>
			<p>{event.organization}</p>
			<Button onClick={goToNextPage}>이벤트 하러 가기</Button>
		</div>
	);
}

export default App;
