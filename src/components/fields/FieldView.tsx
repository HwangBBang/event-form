import React from 'react';
import { Field } from '../../models/Event';
import styled from 'styled-components';
import { TextField } from '@mui/material';

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
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						label={field.title}
						placeholder={field.description}
						value={value as string}
						onChange={(e) => onValueChange(e.target.value)}
					/>
				);
			default:
				return <div>알 수 없는 필드 정보입니다.</div>;
		}
	}, [field.description, field.title, field.type, onValueChange, value]);

	return <FieldViewRoot>{fieldContent}</FieldViewRoot>;
};

const FieldViewRoot = styled.div`
	margin: 24px 0;
	border-radius: 8px;
`;

export default FieldView;
