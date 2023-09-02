import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { ChallengeType } from "~types";

export const ActionGetChallengeById = async (
  challengeId: ChallengeType["id"]
) => {
  return await getDoc(doc(FIREBASE_DB, "challenges", challengeId));
};
