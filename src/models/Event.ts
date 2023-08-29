import { Timestamp } from 'firebase/firestore';

export interface EventDeclaration {
	title: string;
	description: string;
	organization: string;
	fields: Field[];
	limitation: number;
	submitStartAt: Date;
}

export interface Field {
	id: string;
	title: string;
	description?: string;
	type: 'text' | 'number' | 'email' | 'phone' | 'date';

	metadata: any;
}

export interface Apply {
	fields?: { [key in string]: Field };

	createdAt?: Date;
	updatedAt?: Date;
	submittedAt?: Date;
	paidAt?: Date;
	submitRequestedAt?: Timestamp;
}

export interface FieldResponse {
	id: string;
	value: any;
}
