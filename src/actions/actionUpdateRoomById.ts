import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { Room } from "~types";

export const ActionUpdateRoomById = async (room: Room) => {
  try {
    console.log("room - ", room);
    await setDoc(doc(FIREBASE_DB, "rooms", room.id), room);
  } catch (error) {
    console.error("error - ", error);
  }
};
