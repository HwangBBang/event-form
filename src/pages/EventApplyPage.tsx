import React from 'react';

import { useNavigate, useParams } from 'react-router';
import {
	makeApply,
	subscribeApply,
	subscribeEvent,
	updateApplyField,
} from '../db/firestore';
import { Apply, EventDeclaration, FieldResponse } from '../models/Event';
import EventFieldPage from './ProgressPage/EventFieldPage';
import { Button } from '@mui/material';
import usePreventReload from '../hooks/usePreventReload';

function App() {
	const { eventId = '' } = useParams();
	usePreventReload('새로고침을 하면 작성하던 내용이 사라집니다.');

	const [applyId, setApplyId] = React.useState<string | null>(null);

	React.useEffect(() => {
		makeApply(eventId).then((applyId) => {
			setApplyId(applyId);
		});
	}, [eventId]);

	const [event, setEvent] = React.useState<EventDeclaration | null>(null);

	React.useEffect(() => {
		if (!eventId) return;
		const unsubscribeGroups = subscribeEvent(eventId, (_events) => {
			setEvent(_events);
		});
		return () => {
			unsubscribeGroups();
		};
	}, [eventId]);

	const [pageIndex, setPageIndex] = React.useState(0);

	const [response, setResponse] = React.useState<{ [key in string]: any }>({});

	const goToNextPage = React.useCallback(async () => {
		if (!applyId) return;
		await updateApplyField(eventId, applyId, response);
		setPageIndex((prev) => prev + 1);
	}, [applyId, eventId, response]);

	const canGoBack = React.useMemo(() => {
		return pageIndex > 0;
	}, [pageIndex]);

	const goToPrevPage = React.useCallback(async () => {
		setPageIndex((prev) => prev - 1);
	}, []);

	const canGoNext = React.useMemo(() => {
		if (!event) return false;
		if (pageIndex >= event.pages.length - 1) return false;
		return true;
	}, [event, pageIndex]);

	const renderPage = React.useMemo(() => {
		if (!event) return <div>loading...</div>;

		const page = event?.pages[pageIndex];
		switch (page?.type) {
			case 'info':
				return (
					<EventFieldPage
						page={page}
						response={response}
						setResponse={setResponse}
						onNextPage={canGoNext ? goToNextPage : undefined}
						onPrevPage={canGoBack ? goToPrevPage : undefined}
					/>
				);
			case 'fields':
				return (
					<EventFieldPage
						page={page}
						response={response}
						setResponse={setResponse}
						onNextPage={canGoNext ? goToNextPage : undefined}
						onPrevPage={canGoBack ? goToPrevPage : undefined}
					/>
				);
			case 'phoneVerify':
				return <div>phoneVerify</div>;
			case 'payment':
				return <div>payment</div>;
			case 'submit':
				return <div>submit</div>;
			case 'done':
				return <div>done</div>;
			default:
				return <div>loading...</div>;
		}
	}, [
		canGoBack,
		canGoNext,
		event,
		goToNextPage,
		goToPrevPage,
		pageIndex,
		response,
	]);

	return (
		<div className="App">
			<div>{renderPage}</div>
		</div>
	);
}

export default App;
