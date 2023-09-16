import { doc, setDoc } from "firebase/firestore";
import { Message, Room, User } from "~types";
import { FIREBASE_DB } from "~data";
import moment from "moment";
import { generateMessageId } from "~generators";

export const ActionCreateMessageForRoom = async (message: string, sender: User["id"], roomId: Room["id"]) => {
  try {
    const newMessage: Message = {
      id: generateMessageId(),
      message,
      dateTimeSent: moment().format("YYYY-MM-DD HH:mm:ss"),
      sender,
      roomId
    };

    await setDoc(doc(FIREBASE_DB, "messages", newMessage.id), newMessage);
  } catch (e) {
    console.error(e);
  }
};
