import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetHabitById = async (habitId) => {
  return await getDoc(doc(FIREBASE_DB, "habits", habitId));
};
