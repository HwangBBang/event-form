import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';

import { fs } from '../utils/firebase';
import { EventDeclaration } from '../models/Event';

function fbLog(msg: string) {
	console.debug('[Firebase]', msg);
}

export const subscribeEvents = (
	onChange: (events: { [key in string]: EventDeclaration }) => void
) => {
	fbLog(`Subscribe /events`);
	const unsubscribe = onSnapshot(
		query(collection(fs, 'events')),
		(snapshot) => {
			const events: { [key in string]: EventDeclaration } = {};
			snapshot.forEach((d) => {
				const data = d.data();
				if (data) {
					events[d.id] = data as EventDeclaration;
				}
			});
			onChange(events);
		}
	);

	return () => {
		fbLog(`Unsubscribe /DutchPay`);
		unsubscribe();
	};
};

export const subscribeEvent = (
	eventId: string,
	onChange: (event: EventDeclaration) => void
) => {
	fbLog(`Subscribe /events/{${eventId}}`);
	const unsubscribe = onSnapshot(doc(fs, 'events', eventId), (d) => {
		const data = d.data();
		if (data) {
			onChange(data as EventDeclaration);
		}
	});
	return () => {
		fbLog(`Unsubscribe /DutchPay/{${eventId}}`);
		unsubscribe();
	};
};
