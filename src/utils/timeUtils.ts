import { TimeOfDay } from '@shared/types'

export const GetCurrentTimeOfDay = () => {
  const currentTime = new Date().getHours()
  let timeOfDay: TimeOfDay = TimeOfDay.All
  if (currentTime >= 5 && currentTime < 12) {
    timeOfDay = TimeOfDay.Morning
  }
  if (currentTime >= 12 && currentTime < 17) {
    timeOfDay = TimeOfDay.Afternoon
  }
  if (currentTime >= 17 && currentTime < 21) {
    timeOfDay = TimeOfDay.Evening
  }
  if (currentTime >= 21 || currentTime < 5) {
    timeOfDay = TimeOfDay.Morning
  }

  return timeOfDay
}
