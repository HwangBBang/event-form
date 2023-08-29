import React from 'react';
import { EventDeclaration } from '../../models/Event';
import { subscribeEvents } from '../../db/firestore';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

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

	const navigate = useNavigate();

	return (
		<div className="App">
			{Object.entries(events).map(([key, event]) => {
				return (
					<div
						onClick={() => {
							navigate('./' + key);
						}}
					>
						<Card style={{ margin: '0px 24px 16px 24px' }} variant="outlined">
							{event.imageUrl && (
								<CardMedia
									component="img"
									alt="green iguana"
									height="140"
									image={event.imageUrl}
								/>
							)}
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{event.organization}
								</Typography>

								<Typography gutterBottom variant="h5" component="div">
									{event.title}
								</Typography>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<Typography variant="body2" color="text.secondary">
										선착순 {event.limitation}명
									</Typography>

									<Typography variant="body2" color="text.secondary">
										{event.openAt?.toDate().toLocaleString()}
									</Typography>
								</div>
							</CardContent>
						</Card>
					</div>
				);
			})}
		</div>
	);
}

export default App;
