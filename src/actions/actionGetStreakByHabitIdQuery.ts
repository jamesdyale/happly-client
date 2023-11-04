import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetStreakByHabitIdQuery = (habitId) => {
  return query(collection(FIREBASE_DB, "streak"), where("habitId", "==", habitId));
};
