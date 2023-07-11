import { Habit } from '~types'
import { DAY_NAME_OF_WEEK_LONG } from '~constants'

export const calculateLowestDifferenceInDays = (selectedDays: Habit['selectedDays'], currentDay) => {
  const days = DAY_NAME_OF_WEEK_LONG

  let lowestDifference = Number.MAX_VALUE

  for (const day in selectedDays) {
    if (days.indexOf(selectedDays[day]) > days.indexOf(currentDay)) {
      const diff = (days.indexOf(currentDay) + 7 - days.indexOf(selectedDays[day])) % 7
      lowestDifference = Math.min(lowestDifference, diff)
    }
  }

  return lowestDifference
}
