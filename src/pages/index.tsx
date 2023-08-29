import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router';

function App() {
	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Event
					</Typography>
				</Toolbar>
			</AppBar>
			<Outlet />
		</div>
	);
}

export default App;
