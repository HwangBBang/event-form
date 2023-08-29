import React from 'react';

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
