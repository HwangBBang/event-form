export interface EventDeclaration {
	title: string;
	description: string;
	organization: string;
	pages: Page[];
	limitation: number;
	submitStartAt: Date;
}

export interface Page {
	title: string;
	description: string;
	type: 'info' | 'fields' | 'submit' | 'payment' | 'phoneVerify' | 'done';
	fields: Field[];
}

export interface Field {
	id: string;
	title: string;
	description?: string;
	type: 'text' | 'number' | 'email' | 'phone' | 'date';

	metadata: any;
}

export interface Apply {
	fields?: Field[];

	createdAt?: Date;
	updatedAt?: Date;
	submittedAt?: Date;
	paidAt?: Date;
	completedAt?: Date;
}

export interface FieldResponse {
	id: string;
	value: any;
}
