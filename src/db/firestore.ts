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

export const makeApply = async (eventId: string) => {
	fbLog(`Make application /events/{${eventId}}`);
	const eventRef = doc(fs, 'events', eventId);
	const eventDoc = await getDoc(eventRef);
	if (!eventDoc.exists()) {
		throw new Error('Event not found');
	}
	const event = eventDoc.data() as EventDeclaration;
	// if (event.status !== 'open') {
	// 	throw new Error('Event is not open');
	// }
	const appliesRef = collection(eventRef, 'applies');
	const applyDoc = await addDoc(appliesRef, {
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	return applyDoc.id;
};

export const updateApply = async (
	eventId: string,
	applyId: string,
	fields: any
) => {
	fbLog(`Update apply /events/{${eventId}}/applies/{${applyId}}`);
	const applyRef = doc(fs, 'events', eventId, 'applies', applyId);
	// update 'fields' on applyRef document
	const data = {
		fields,
		updatedAt: new Date(),
	};

	await updateDoc(applyRef, data);
};
