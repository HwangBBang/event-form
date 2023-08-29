import React from 'react';
import { Field } from '../../models/Event';
import TextField from './TextField';
import styled from 'styled-components';

export interface FieldProps {
	field: Field;
	value: any;
	onValueChange: (value: any) => void;
}

const FieldView = ({ field, value, onValueChange }: FieldProps) => {
	const fieldContent = React.useMemo(() => {
		switch (field.type) {
			case 'text':
				return (
					<TextField
						value={value as string}
						onValueChange={(value) => {
							onValueChange(value);
						}}
					/>
				);
			default:
				return <div>알 수 없는 필드 정보입니다.</div>;
		}
	}, [field.type, onValueChange, value]);

	return (
		<FieldViewRoot>
			<p>{field.title}</p>
			{field.description && <p>{field.description}</p>}
			{fieldContent}
		</FieldViewRoot>
	);
};

const FieldViewRoot = styled.div`
	background-color: #cccccc;
	padding: 4px 16px;
	margin: 24px;
	border-radius: 8px;
`;

export default FieldView;
