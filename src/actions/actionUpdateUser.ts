import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { User } from "~types";

export const ActionUpdateUser = async (user: User) => {
  try {
    console.log("user - ", user);
    await setDoc(doc(FIREBASE_DB, "users", user.id), user);
  } catch (error) {
    console.error("error - ", error);
  }
};
