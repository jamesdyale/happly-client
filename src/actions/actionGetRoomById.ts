import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { Room } from "~types";

export const ActionGetRoomById = async (roomId: Room["id"]) => {
  return await getDoc(doc(FIREBASE_DB, "rooms", roomId));
};
