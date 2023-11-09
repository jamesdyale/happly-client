import { and, collection, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { User } from "~types";
import moment from "moment/moment";

export const ActionGetCompletedStatForDay = (userId: User["id"], selectedDay: string) => {
  try {
    return query(collection(FIREBASE_DB, "stats"), and(where("userId", "==", userId), where("completedAt", "==", moment(selectedDay, "MMMM Do YYYY").format("ddd MMM DD YYYY"))));
  } catch (error) {
    console.log("error - ", error);
  }
};
