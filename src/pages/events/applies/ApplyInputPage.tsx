import React from 'react';
import FieldView from '../../../components/fields/FieldView';
import { Apply, EventDeclaration } from '../../../models/Event';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	onFieldSave: (fields: { [key in string]: any }) => void;
}

const EventFieldPage = ({ event, apply, onFieldSave }: EventFieldPageProps) => {
	const navigate = useNavigate();
	const [response, setResponse] = React.useState<{ [key in string]: any }>({});

	return (
		<div style={{ padding: 24 }}>
			<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
				정보 입력
			</Typography>
			<p>
				이벤트 상품 수령을 위한 개인정보를 입력합니다. 개인정보는 당첨자의 경우
				상품 수령 이후 3일까지 보관되며, 비 당첨자는 이벤트 종료와 함께 즉시
				삭제됩니다.
			</p>
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

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button
					variant="contained"
					size="medium"
					//
					onClick={() => navigate('../')}
				>
					이전
				</Button>
				<Button
					variant="contained"
					size="medium"
					onClick={() => onFieldSave(response)}
				>
					다음
				</Button>
			</div>
		</div>
	);
};

export default EventFieldPage;
