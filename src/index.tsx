import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexPage from './pages';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EventRegisterPage from './pages/EventRegisterPage';
import EventsPage from './pages/EventsPage';
import EventEditPage from './pages/EventEditPage';
import EventResultPage from './pages/EventResultPage';

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
						<Route path="new" element={<EventEditPage />} />
						<Route path=":eventId" element={<EventRegisterPage />}></Route>
						<Route path=":eventId/edit" element={<EventEditPage />} />
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
