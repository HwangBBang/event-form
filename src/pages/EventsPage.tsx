import React from 'react';
import { subscribeEvents } from '../db/firestore';
import { EventDeclaration } from '../models/Event';

function App() {
	const [events, setEvents] = React.useState<{
		[name in string]: EventDeclaration;
	}>({});
	React.useEffect(() => {
		const unsubscribeGroups = subscribeEvents((_events) => {
			setEvents(_events);
		});
		return () => {
			unsubscribeGroups();
		};
	}, []);

	return (
		<div className="App">
			{Object.values(events).map((event) => {
				return (
					<div>
						<div>{event.title}</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
