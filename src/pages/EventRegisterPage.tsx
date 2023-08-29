import React from 'react';

import { useParams } from 'react-router';

function App() {
	const params = useParams();
	return <div className="App">EventRegisterPage{JSON.stringify(params)}</div>;
}

export default App;
