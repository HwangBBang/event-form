import { onRequest } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

const firestore = admin.firestore();

export const submit = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");
  // eventId, ApplyId 를 받아서 firestore 로부터 각각 로드

  const eventId = request.query.eventId as string;
  const applyId = request.query.applyId as string;

  if (eventId === undefined || applyId === undefined) {
    response.status(400).send("eventId or applyId is undefined");
    return;
  }

  const eventRef = firestore.collection("events").doc(eventId);
  const applyRef = eventRef.collection("applies").doc(applyId);

  const event = await eventRef.get();
  const apply = await applyRef.get();

  if (!event.exists || !apply.exists) {
    response.status(404).send("event or apply not found");
    return;
  }

  const eventData = event.data();
  const applyData = apply.data();

  if (eventData === undefined || applyData === undefined) {
    response.status(500).send("event or apply data is undefined");
    return;
  }

  // apply.applyRequestAt 을 현재 시간으로 지정

  applyRef.update({ applyRequestAt: new Date() });

  // apply 목록을 가져오기

  const applies = await eventRef.collection("applies").get();

  // applies를 applyRequestAt 기준으로 정렬

  const sortedApplies = applies.docs
    .filter((apply) => apply.data().applyRequestAt !== undefined)
    .sort((a, b) => {
      const aData = a.data();
      const bData = b.data();

      if (aData === undefined || bData === undefined) {
        return 0;
      }

      if (
        aData.applyRequestAt === undefined ||
        bData.applyRequestAt === undefined
      ) {
        return 0;
      }

      const aDate = aData.applyRequestAt.toDate();
      const bDate = bData.applyRequestAt.toDate();

      return aDate.getTime() - bDate.getTime();
    });

  // limitation이 있으면 해당 limitation을 넘는지 확인

  if (eventData.limitation !== undefined) {
    if (sortedApplies.length >= eventData.limitation) {
      response.status(403).send("이미 모두 마감되었습니다.");
      return;
    }
  }

  // 해당 리스트에 본인이 있는지 확인 boolean

  const index = sortedApplies.findIndex((apply) => apply.id === applyId);

  // 본인이 없으면 404

  if (index === -1) {
    response.status(403).send("이미 모두 마감되었습니다.");
    return;
  }

  // 본인이 있으면 해당 인덱스를 applyNumber로 지정

  applyRef.update({ applyNumber: index + 1 });
  eventRef.update({ applyNumber: index + 1 });

  response.send({ applyNumber: index + 1 });
});
