import React from 'react';

import { useParams } from 'react-router';
import { subscribeEvent } from '../db/firestore';
import { EventDeclaration } from '../models/Event';
import EventFieldPage from './EventPage/EventFieldPage';

function App() {
	const { eventId } = useParams();

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

	const renderPage = React.useMemo(() => {
		const page = event?.pages[pageIndex];
		switch (page?.type) {
			case 'info':
				return <EventFieldPage page={page} />;
			case 'fields':
				return <EventFieldPage page={page} />;
			case 'payment':
				return <div>page</div>;
			case 'submit':
				return <div>page</div>;
			case 'done':
				return <div>page</div>;
			default:
				return <div>loading...</div>;
		}
	}, [event?.pages, pageIndex]);

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
