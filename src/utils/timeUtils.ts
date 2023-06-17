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
export const formatAMPM = (date) => {
  let hours = date.getHours(),
    minutes = date.getMinutes(),
    ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutes + ' ' + ampm
}
