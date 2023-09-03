import { collection, getDocs, or, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetRoomsUserIsInByUserID = async (userId) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, "rooms"),
      or(
        where("createdBy", "==", userId),
        where("users", "array-contains", userId)
      )
    )
  );
};
