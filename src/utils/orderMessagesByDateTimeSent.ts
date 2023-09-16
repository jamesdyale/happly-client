import moment from "moment";

export const orderMessagesByDateTimeSent = (messages) => {
  const messagesObject = {};

  messages.forEach((message) => {
    const timeSent = moment(message.dateTimeSent).format("DD/MM/YYYY");

    if (messagesObject[timeSent]) {
      messagesObject[timeSent].push(message);
    } else {
      messagesObject[timeSent] = [message];
    }
  });

  return messagesObject;
};
