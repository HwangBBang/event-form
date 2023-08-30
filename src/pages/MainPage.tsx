import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

function App() {
	const navigate = useNavigate();
	return (
		<div className="App">
			<Button
				variant="contained"
				size="medium"
				style={{ backgroundColor: 'grey', color: 'white' }}
				onClick={() => {
					navigate(`./events`);
				}}
			>
				이벤트들 보러가기
			</Button>
		</div>
	);
}

export default App;
