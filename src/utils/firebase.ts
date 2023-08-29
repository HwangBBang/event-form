import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA73_tIFvaVKu0KwSX6vYdWRW3lsC97kOI',
	authDomain: 'event-form-33686.firebaseapp.com',
	projectId: 'event-form-33686',
	storageBucket: 'event-form-33686.appspot.com',
	messagingSenderId: '201439609047',
	appId: '1:201439609047:web:3fc3f3c84325d91e553092',
	measurementId: 'G-T51EJ7KJDW',
};

export const app = initializeApp(firebaseConfig);

export const fs = getFirestore(app);
export const auth = getAuth(app);
