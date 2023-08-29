import React from 'react';
import FieldView from '../../components/fields/FieldView';
import { Page } from '../../models/Event';
import { Button } from '@mui/material';

export interface EventFieldPageProps {
	page: Page;
	response: { [key in string]: any };
	setResponse: (response: { [key in string]: any }) => void;
	onNextPage?: () => void;
}

const EventFieldPage = ({
	page,
	response,
	setResponse,
	onNextPage,
}: EventFieldPageProps) => {
	return (
		<div>
			<p>{page.title}</p>
			<p>{page.description}</p>
			<p>
				{page.fields.map((field) => {
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
			</p>
			<Button onClick={onNextPage}>다음</Button>
		</div>
	);
};

export default EventFieldPage;
