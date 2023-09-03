import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "~data";

export const ActionGetRoomByUserId = async (userId) => {
  return await getDocs(
    query(collection(FIREBASE_DB, "rooms"), where("createdBy", "==", userId))
  );
};
