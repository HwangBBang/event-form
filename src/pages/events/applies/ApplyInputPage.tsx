import React from 'react';
import FieldView from '../../../components/fields/FieldView';
import { Apply, EventDeclaration } from '../../../models/Event';
import { Button, Card, Typography } from '@mui/material';

export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	onFieldSave: (fields: { [key in string]: any }) => void;
}

const EventFieldPage = ({ event, apply, onFieldSave }: EventFieldPageProps) => {
	const [response, setResponse] = React.useState<{ [key in string]: any }>({});

	return (
		<div style={{ padding: 24 }}>
			<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
				정보 입력
			</Typography>
			<p>이벤트 상품 수령을 위한 개인정보를 입력합니다.</p>
			<div>
				{event.fields?.map((field) => {
					return (
						<FieldView
							field={field}
							value={response[field.id]}
							onValueChange={(value) => {
								setResponse((prev: any) => {
									return {
										...prev,
										[field.id]: value,
									};
								});
							}}
						/>
					);
				})}
			</div>

			<Button onClick={() => onFieldSave(response)}>다음</Button>
		</div>
	);
};

export default EventFieldPage;
