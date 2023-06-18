import { TimeOfDay } from '@shared/types'
import moment from 'moment/moment'

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


export const findClosestReminder = (reminders) => {
  const currentTime = moment()

  let closestTime
  let minDifference = Infinity

  reminders.map((reminder) => {
    const difference = moment(reminder).diff(currentTime)

    if (difference < 0) {
      const dayPlusOne = moment(reminder).add(1, 'days')
      const difference = moment(dayPlusOne).diff(currentTime)

      if (difference < minDifference) {
        minDifference = difference
        closestTime = reminder
      }
    } else {
      if (difference < minDifference) {
        minDifference = difference
        closestTime = reminder
      }
    }

  })

  return `${moment(closestTime).format('h:mm a')}`
}
