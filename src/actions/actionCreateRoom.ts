import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { ChallengeType, Room } from "~types";

export const ActionCreateRoom = async (room: Room) => {
  try {
    await setDoc(doc(FIREBASE_DB, "rooms", room.id), room);
  } catch (e) {
    console.error(e);
  }
};
