import { Apply, EventDeclaration } from '../../../models/Event';
import { useApplies } from '../../../db/firestore';

export interface EventFieldPageProps {
	event: EventDeclaration;
	apply: Apply;
	eventId: string;
	applyId: string;
}

const EventFieldPage = ({
	event,
	apply,
	eventId,
	applyId,
}: EventFieldPageProps) => {
	const applies = useApplies(eventId);

	if (!applies) return <div>응모중입니다</div>;

	const limitation = event.limitation;
	const submitterList = Object.entries(applies)
		.sort((a, b) => {
			const aRequestedAt = a[1].submitRequestedAt?.toDate().getTime();
			const bRequestedAt = b[1].submitRequestedAt?.toDate()?.getTime();

			if (!aRequestedAt) return 1;
			if (!bRequestedAt) return -1;

			const timeDiff = aRequestedAt - bRequestedAt;
			if (timeDiff > 0) return 1;
			if (timeDiff < 0) return -1;

			return 0;
		})
		.slice(0, limitation);

	const myIndex = submitterList.findIndex((apply) => apply[0] === applyId);

	if (myIndex === -1) return <div>당첨에 실패하였습니다..</div>;

	return (
		<div>
			<h1>{myIndex + 1}번째로 당첨되었습니다!</h1>
		</div>
	);
};

export default EventFieldPage;
