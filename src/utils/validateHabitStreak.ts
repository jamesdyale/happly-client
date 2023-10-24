import moment from "moment";
import { ActionUpdateStreak } from "../actions/actionUpdateStreak";
import { Streak, Habit, Frequency, Stats } from "~types";
import { calculateLowestDifferenceInDays } from "./calculateLowestDifferenceInDays";

export const validateHabitStreak = async (
  currentStreak: Streak,
  selectedHabit: Habit,
  stats: Stats[]
) => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    if (
      moment(currentStreak.lastUpdated).format("YYYY-MM-DD") === currentDate
    ) {
      return currentStreak;
    }
    console.log("selectedHabit - ", selectedHabit);
    if (selectedHabit.frequencyOption === Frequency.Daily) {
      const validStats = stats.filter((stat) => {
        // TODO: optimize this better by query the DB not doing it manually
        if (
          moment(currentDate).isSame(stat.completedAt, "day") ||
          moment(currentDate).subtract(1, "day").isSame(stat.completedAt, "day")
        ) {
          return stat;
        } else {
          return null;
        }
      });

      if (validStats.length === 0) {
        console.log("validStats - ", validStats);
        const newStreak: Streak = {
          ...currentStreak,
          count: 0
        };

        await ActionUpdateStreak(newStreak);

        return newStreak;
      } else {
        return currentStreak;
      }
    } else if (selectedHabit.frequencyOption === Frequency.Weekly) {
      // TODO: there is a bug here
      const currentDay = moment(currentDate).format("dddd");
      console.log("currentDay - ", currentDay);
      const lowestDifference = calculateLowestDifferenceInDays(
        selectedHabit.selectedDays,
        currentDay
      );
      const lastEligibleDateToKeepStreakAlive = moment(currentDate)
        .subtract(lowestDifference, "day")
        .format("MMMM Do YYYY");

      let isStreakValid = false;

      if (currentStreak.lastUpdated === lastEligibleDateToKeepStreakAlive) {
        isStreakValid = true;
      } else {
        const validStats = stats.filter((stat) => {
          const completedAtDate = moment(stat.completedAt).format(
            "MMMM Do YYYY"
          );
          if (completedAtDate === lastEligibleDateToKeepStreakAlive) {
            return stat;
          } else {
            return null;
          }
        });

        if (validStats.length > 0) {
          isStreakValid = true;
        }
      }

      if (isStreakValid) {
        return currentStreak;
      } else {
        const newStreak: Streak = {
          ...currentStreak,
          count: 0
        };

        await ActionUpdateStreak(newStreak);

        return newStreak;
      }
    }
  } catch (error) {
    console.log("error -", error);
  }
};
