import moment from "moment";
import { Message } from "~types";

export const groupMessagesByDateTimeSent = (messages: Message[]) => {
  const messagesObject = {};
  console.log("timeSent - ", moment("September 16th 2022", "MMMM Do YYYY"));

  messages.forEach((message) => {
    const timeSent = moment(message.date, "MMMM Do YYYY").format("DD/MM/YYYY");
    if (messagesObject[timeSent]) {
      messagesObject[timeSent].push(message);
    } else {
      messagesObject[timeSent] = [message];
    }
  });

  return messagesObject;
};
