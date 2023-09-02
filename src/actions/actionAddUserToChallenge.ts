import { doc, setDoc } from "firebase/firestore";
import { Frequency, Habit, TimeOfDay, User } from "~types";
import { FIREBASE_DB } from "~data";
import { ChallengeType } from "~types/ChallengeType";
import { generateHabitId } from "~generators";
import moment from "moment";

export const ActionAddUserToChallenge = async (
  challenge: ChallengeType,
  userId: User["id"]
) => {
  try {
    const habit: Habit = {
      id: generateHabitId(),
      name: challenge.name,
      description: challenge.description,
      userId,
      timeOfDay: TimeOfDay.All,
      frequencyOption: Frequency.Daily,
      createdAt: moment().format("MMMM Do YYYY")
    };
  } catch (e) {
    console.error(e);
  }
};
