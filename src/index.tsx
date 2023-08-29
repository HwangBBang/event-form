import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexPage from './pages';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EventApplicationPage from './pages/EventApplyPage';
import EventsPage from './pages/EventsPage';
import EventEditPage from './pages/EventEditPage';
import EventResultPage from './pages/EventResultPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EventPage from './pages/EventPage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage />}>
					<Route index element={<MainPage />} />
					<Route path="events">
						<Route index element={<EventsPage />} />
						<Route path=":eventId" element={<EventPage />}></Route>
						<Route path=":eventId/edit" element={<EventEditPage />} />
						<Route path=":eventId/apply" element={<EventApplicationPage />} />
						<Route path=":eventId/result" element={<EventResultPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
