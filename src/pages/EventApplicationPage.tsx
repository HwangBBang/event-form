import React from 'react';

import { useParams } from 'react-router';
import { subscribeEvent } from '../db/firestore';
import { EventDeclaration } from '../models/Event';

function App() {
	const { eventId } = useParams();

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

	const [pageIndex, setPageIndex] = React.useState(0);

	if (!event) return <div>loading...</div>;
	return (
		<div className="App">
			<p>{event.title}</p>
			<p>{event.description}</p>
			<p>{event.organization}</p>
			<div>{renderPage}</div>
		</div>
	);
}

export default App;
