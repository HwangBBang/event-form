import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';

import { fs } from '../utils/firebase';
import { Apply, EventDeclaration } from '../models/Event';
import { useEffect, useState } from 'react';

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

export const updateApplyField = async (
	eventId: string,
	applyId: string,
	fields: any
) => {
	fbLog(`Update apply /events/{${eventId}}/applies/{${applyId}}`);
	const applyRef = doc(fs, 'events', eventId, 'applies', applyId);
	// update 'fields' on applyRef document
	const data: Apply = {
		fields,
		updatedAt: new Date(),
	};

	await updateDoc(applyRef, data as any);
};

export const updateApply = async (
	eventId: string,
	applyId: string,
	fields: any
) => {
	fbLog(`Update apply /events/{${eventId}}/applies/{${applyId}}`);
	const applyRef = doc(fs, 'events', eventId, 'applies', applyId);

	await updateDoc(applyRef, { ...fields, updatedAt: new Date() });
};

export const subscribeApply = (
	eventId: string,
	applyId: string,
	onChange: (apply: Apply) => void
) => {
	fbLog(`Subscribe /events/{${eventId}}/applies/{${applyId}}`);
	const unsubscribe = onSnapshot(
		doc(fs, 'events', eventId, 'applies', applyId),
		(d) => {
			const data = d.data();
			if (data) {
				onChange(data as Apply);
			}
		}
	);
	return () => {
		fbLog(`Unsubscribe /events/{${eventId}}/applies/{${applyId}}`);
		unsubscribe();
	};
};

export const useSubscribeApplies = (
	eventId: string
): { [key in string]: Apply } => {
	const [applies, setApplies] = useState<{ [key in string]: Apply }>({});

	useEffect(() => {
		fbLog(`Subscribe /events/{${eventId}}/applies`);

		const unsubscribe = onSnapshot(
			query(collection(fs, 'events', eventId, 'applies')),
			(snapshot) => {
				const newApplies: { [key in string]: Apply } = {};
				snapshot.forEach((doc) => {
					const data = doc.data();
					if (data) {
						newApplies[doc.id] = data as Apply;
					}
				});
				setApplies((a) => ({ ...a, ...newApplies }));
			}
		);

		return () => {
			fbLog(`Unsubscribe /events/{${eventId}}/applies`);
			unsubscribe();
		};
	}, [eventId]);

	return applies;
};

export const useApplies = (
	eventId: string
): { [key in string]: Apply } | null => {
	const [applies, setApplies] = useState<{ [key in string]: Apply } | null>(
		null
	);

	useEffect(() => {
		fbLog(`Fetch once /events/{${eventId}}/applies`);

		const fetchApplies = async () => {
			const q = query(collection(fs, 'events', eventId, 'applies'));
			const snapshot = await getDocs(q);

			const newApplies: { [key in string]: Apply } = {};
			snapshot.forEach((doc) => {
				const data = doc.data();
				if (data) {
					newApplies[doc.id] = data as Apply;
				}
			});
			setApplies(newApplies);
		};

		fetchApplies();
	}, [eventId]);

	return applies;
};
