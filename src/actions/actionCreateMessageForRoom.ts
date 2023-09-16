import { Timestamp, doc, setDoc } from "firebase/firestore";
import { Message, Room, User } from "~types";
import { FIREBASE_DB } from "~data";
import moment from "moment";
import { generateMessageId } from "~generators";

export const ActionCreateMessageForRoom = async ({ message, sender, roomId }) => {
  try {
    const newMessage: Message = {
      id: generateMessageId(),
      message,
      date: moment().format("MMMM Do YYYY"),
      time: moment().format("HH:mm:ss:SSS"),
      sender,
      roomId
    };

    await setDoc(doc(FIREBASE_DB, "messages", newMessage.id), newMessage);
  } catch (e) {
    throw new Error(e);
  }
};
