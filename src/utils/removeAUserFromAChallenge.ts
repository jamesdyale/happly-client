import { ActionCreateChallenge, ActionGetChallengeById } from "~actions";
import { ChallengeType, User } from "~types";

export const removeAUserFromAChallenge = async (
  challengeId: ChallengeType["id"],
  userId: User["id"]
) => {
  try {
    const challengeDocs = await ActionGetChallengeById(challengeId);

    const challenge = challengeDocs.data() as unknown as ChallengeType;

    const participants = challenge.participants.filter((c) => c !== userId);

    await ActionCreateChallenge({
      id: challenge.id,
      name: challenge.name,
      description: challenge.description,
      participants,
      hashtags: challenge.hashtags,
      duration: challenge.duration
    });
  } catch (error) {
    console.log("error - ", error);
  }
};
