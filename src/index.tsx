import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexPage from './pages';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EventsPage from './pages/events/EventsPage';
import EventPage from './pages/events/EventPage';
import EventEditPage from './pages/events/EventEditPage';
import EventResultPage from './pages/events/EventResultPage';
import ApplyPage from './pages/events/applies';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
const theme = createTheme({
	palette: {
		primary: {
			main: '#ff9900',
		},
	},
});

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<IndexPage />}>
						<Route index element={<MainPage />} />
						<Route path="events">
							<Route index element={<EventsPage />} />
							<Route path=":eventId" element={<EventPage />}></Route>
							<Route path=":eventId/edit" element={<EventEditPage />} />
							<Route path=":eventId/applies/:applyId" element={<ApplyPage />} />
							<Route path=":eventId/result" element={<EventResultPage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
