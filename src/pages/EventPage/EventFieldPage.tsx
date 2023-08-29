import React from 'react';
import FieldView from '../../components/fields/FieldView';
import { Page } from '../../models/Event';

export interface EventFieldPageProps {
	page: Page;
}

const EventFieldPage = ({ page }: EventFieldPageProps) => {
	const [values, setValues] = React.useState<any>({});
	return (
		<div>
			<p>{page.title}</p>
			<p>{page.description}</p>
			<p>
				{page.fields.map((field) => {
					return (
						<FieldView
							field={field}
							onValueChange={(value) => {
								setValues((prev: any) => {
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
		</div>
	);
};

export default EventFieldPage;
