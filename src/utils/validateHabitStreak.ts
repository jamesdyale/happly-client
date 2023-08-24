import moment from "moment";
import { ActionUpdateStreak } from "~actions";
import { Streak, Habit, Frequency, Stats } from "~types";
import { calculateLowestDifferenceInDays } from "~utils";

export const validateHabitStreak = async (
  currentStreak: Streak,
  selectedHabit: Habit,
  stats: Stats[]
) => {
  const currentDate = moment().format("YYYY-MM-DD");

  if (moment(currentStreak.lastUpdated).format("YYYY-MM-DD") === currentDate) {
    return currentStreak;
  }

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
    const currentDay = moment(currentDate).format("dddd");

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
        const completedAtDate = moment(stat.completedAt).format("MMMM Do YYYY");
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
};
