import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetStreakByHabitId = async (habitId) => {
  return await getDocs(query(collection(FIREBASE_DB, "streak"), where("habitId", "==", habitId)));
};
