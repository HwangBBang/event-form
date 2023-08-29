import React from 'react';
import { Field } from '../../models/Event';
import TextField from './TextField';

export interface FieldProps {
	field: Field;
	onValueChange: (value: any) => void;
}

const FieldView = ({ field, onValueChange }: FieldProps) => {
	const fieldContent = React.useMemo(() => {
		switch (field.type) {
			case 'text':
				return (
					<TextField
						value={''}
						onValueChange={(value) => {
							onValueChange(value);
						}}
					/>
				);
			default:
				return <div>알 수 없는 필드 정보입니다.</div>;
		}
	}, [field, onValueChange]);

	return (
		<div>
			<p>{field.title}</p>
			<p>{field.description}</p>
			{fieldContent}
		</div>
	);
};

export default FieldView;
