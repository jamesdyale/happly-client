import { doc, setDoc } from "firebase/firestore";
import { duration } from "moment";

import { FIREBASE_DB } from "~data";
import { generateChallengeId } from "~generators";
import { ChallengeType } from "~types";

export const ActionCreateChallenge = async ({
  id,
  name,
  description,
  participants,
  numberOfParticipants,
  hashtags,
  duration
}) => {
  try {
    const challenge: ChallengeType = {
      id,
      name,
      description,
      participants,
      numberOfParticipants,
      hashtags,
      duration
    };

    await setDoc(doc(FIREBASE_DB, "challenges", challenge.id), challenge);

    return challenge;
  } catch (e) {
    console.error(e);
  }
};
