import moment from "moment";
import { ActionCreateStat } from "../actions/actionCreateStat";
import { ActionGetStatsByHabitId } from "../actions/actionGetStatsByHabitId";
import { generateStatId } from "~generators";
import { Stats } from "~types";

export const markHabitAsDone = async ({
  habit,
  selectedDay,
  isHabitCard
}): Promise<{
  message: string;
  stat: Stats | null;
}> => {
  const response: {
    message: string;
    stat: Stats | null;
  } = { message: "", stat: null };

  // check if a habit being clicked is in the current day
  if (!habit) {
    return;
  }

  let retrievedStatsFromHabitId;
  let existingStat = false;

  if (!isHabitCard) {
    retrievedStatsFromHabitId = await ActionGetStatsByHabitId(habit.id);

    if (!retrievedStatsFromHabitId) return;

    retrievedStatsFromHabitId.forEach((doc) => {
      const data = doc.data() as unknown as Stats;
      if (
        data.completedAt ===
        moment(selectedDay, "MMMM Do YYYY").format("ddd MMM DD YYYY")
      ) {
        existingStat = true;
      }
    });
  }

  if (!moment(selectedDay, "MMMM Do YYYY").isSame(moment(), "day")) {
    response.message = "You can only complete habits for today.";

    return response;
  }

  if (!existingStat) {
    const stat = {
      id: generateStatId(),
      userId: habit.userId,
      habitId: habit.id,
      completedAt: moment(selectedDay, "MMMM Do YYYY").format(
        "ddd MMM DD YYYY"
      ),
      progress: 100
    };

    try {
      const createdStat = await ActionCreateStat(stat);

      if (!createdStat) {
        response.message =
          "An error happened when completing your habit. Please try again!";
        return response;
      }

      response.message = "Congratulations.";
      response.stat = createdStat;
      return response;
    } catch (e) {
      response.message =
        "An error happened when completing your habit. Please try again!";
      return response;
    }
  }
};
