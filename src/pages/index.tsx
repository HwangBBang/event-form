import React from 'react';
import logo from './logo.svg';
import { Outlet } from 'react-router';

function App() {
	return (
		<div className="App">
			index
			<Outlet />
		</div>
	);
}

export default App;
