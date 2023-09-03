import { collection, getDocs, or, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetRoomsUserIsInByUserID = (userId) => {
  try {
    return query(
      collection(FIREBASE_DB, "rooms"),
      or(
        where("createdBy", "==", userId),
        where("users", "array-contains", userId)
      )
    );
  } catch (error) {
    console.log("error - ", error);
  }
};
