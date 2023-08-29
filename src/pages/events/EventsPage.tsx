import React from 'react';
import { EventDeclaration } from '../../models/Event';
import { subscribeEvents } from '../../db/firestore';

function App() {
	const [events, setEvents] = React.useState<{
		[name in string]: EventDeclaration;
	}>({});
	React.useEffect(() => {
		const unsubscribeGroups = subscribeEvents(setEvents);
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
