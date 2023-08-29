import React from 'react';

import { useNavigate, useParams } from 'react-router';
import { Button } from '@mui/material';
import { EventDeclaration } from '../../models/Event';
import { makeApply, subscribeEvent } from '../../db/firestore';

function App() {
	const { eventId = '' } = useParams();
	const navigate = useNavigate();

	const [event, setEvent] = React.useState<EventDeclaration | null>(null);
	React.useEffect(() => {
		if (!eventId) return;
		const unsubscribeGroups = subscribeEvent(eventId, setEvent);
		return () => {
			unsubscribeGroups();
		};
	}, [eventId]);

	const goToNextPage = React.useCallback(async () => {
		const applyId = await makeApply(eventId);
		navigate(`./applies/${applyId}?step=input`);
	}, [eventId, navigate]);

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
