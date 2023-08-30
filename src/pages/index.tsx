import React from 'react';

import { Outlet, useNavigate } from 'react-router';

import Logo from '../assets/logo.svg';
import styled from 'styled-components';

const Header = styled.div`
	position: sticky;
	top: 0;
	background-color: white;
	padding: 24px 24px 16px 24px;
`;

function App() {
	const navigate = useNavigate();
	return (
		<div className="App">
			<Header>
				<div onClick={() => navigate('/')}>
					<img src={Logo} alt="logo" style={{ height: 28 }} />
				</div>
			</Header>
			<Outlet />
		</div>
	);
}

export default App;
