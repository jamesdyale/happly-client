import { ActionGetChallengeById, ActionGetChallenges } from "~actions";

export const checkIfChallengeIsCompleted = async (challengeId) => {
  // GET THE CHALLENGE To get the goal of the challenge
  console.log(challengeId);
  const docs = await ActionGetChallengeById(challengeId);

  if (!docs) return;

  console.log("docs - ", docs.data);

  // Check how long the streak has been

  // for this user and if they have hit the goal
  // If they have then return true else return false
};
