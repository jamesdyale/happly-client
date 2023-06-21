import { TimeOfDay } from '@shared/types'
import moment from 'moment/moment'

export const GetCurrentTimeOfDay = () => {
  const currentTime = parseInt(moment().format('HH'))
  let timeOfDay: TimeOfDay = TimeOfDay.All

  if (currentTime >= 0 && currentTime < 12) {
    timeOfDay = TimeOfDay.Morning
  } else if (currentTime >= 12 && currentTime < 17) {
    timeOfDay = TimeOfDay.Afternoon
  } else if (currentTime >= 17 && currentTime < 21) {
    timeOfDay = TimeOfDay.Evening
  } else if (currentTime >= 21 && currentTime < 24) {
    timeOfDay = TimeOfDay.Evening
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
