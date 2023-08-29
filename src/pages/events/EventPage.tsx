import React from 'react';

import { useNavigate, useParams } from 'react-router';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { EventDeclaration } from '../../models/Event';
import { makeApply, subscribeEvent } from '../../db/firestore';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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

	if (!event)
		return (
			<div>
				<CircularProgress color="inherit" />
			</div>
		);

	return (
		<div
			className="App"
			style={{
				margin: '0 24px',
			}}
		>
			<p>
				<Box sx={{ bgcolor: 'background.paper' }}>
					<Typography
						// component="h3"
						variant="h5"
						style={{ fontWeight: 'bold' }}
						color="text.primary"
						gutterBottom
					>
						{event.title}
					</Typography>
					<Typography variant="body2" color="text.secondary" paragraph>
						{event.organization}
					</Typography>
				</Box>
			</p>
			<img
				alt="이미지"
				src={event.imageUrl}
				style={{
					width: '100%',
					marginBottom: '16px',
				}}
			/>

			<Typography variant="body1" color="text.secondary" paragraph>
				{event.description}
			</Typography>
			<Typography variant="body1" color="text.secondary" paragraph>
				이벤트 일시: {event.openAt.toDate().toLocaleString()}
			</Typography>

			<Typography variant="body1" color="text.secondary">
				제한 인원: {event.limitation}명
			</Typography>

			<div style={{ textAlign: 'right' }}>
				<Button
					variant="contained"
					endIcon={<SendIcon />}
					onClick={goToNextPage}
				>
					신청
				</Button>
			</div>
		</div>
	);
}

export default App;
