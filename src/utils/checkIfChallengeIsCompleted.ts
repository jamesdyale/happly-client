import {
  ActionGetChallengeById,
  ActionGetChallenges,
  ActionGetStreakByHabitId
} from "~actions";
import { ChallengeType, Habit, Streak } from "~types";

export const checkIfChallengeIsCompleted = async ({
  challengeId,
  habitId
}: {
  challengeId: ChallengeType["id"];
  habitId: Habit["id"];
}) => {
  // GET THE CHALLENGE To get the goal of the challenge
  const challengeDocs = await ActionGetChallengeById(challengeId);
  const streakDocs = await ActionGetStreakByHabitId(habitId);

  if (!challengeDocs) return null;

  const streaks: Streak[] = [];
  streakDocs.forEach((doc) => {
    const data = doc.data() as unknown as Streak;
    streaks.push(data);
  });

  const challengeData = challengeDocs.data() as unknown as ChallengeType;
  const streakData = streaks[0];

  // Check how long the streak has been for this user and if they have hit the goal
  return {
    streakCount: streakData.count,
    challengeDuration: challengeData.duration
  };
};
