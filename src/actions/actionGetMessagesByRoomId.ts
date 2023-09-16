import { collection, orderBy, query, where } from "firebase/firestore";
import { Room } from "~types";
import { FIREBASE_DB } from "~data";

export const ActionGetMessagesByRoomId = (roomId: Room["id"]) => {
  try {
    return query(
      collection(FIREBASE_DB, "messages"),
      where("roomId", "==", roomId),
      orderBy("date", "asc"),
      orderBy("time", "asc")
    );
  } catch (error) {
    console.log("error - ", error);
  }
};
