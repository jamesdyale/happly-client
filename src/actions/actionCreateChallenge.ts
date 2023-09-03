import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "~data";
import { ChallengeType } from "~types";

export const ActionCreateChallenge = async ({
  id,
  name,
  description,
  participants,
  hashtags,
  duration
}) => {
  try {
    const challenge: ChallengeType = {
      id,
      name,
      description,
      participants,
      hashtags,
      duration
    };

    await setDoc(doc(FIREBASE_DB, "challenges", challenge.id), challenge);

    return challenge;
  } catch (e) {
    console.error(e);
  }
};
