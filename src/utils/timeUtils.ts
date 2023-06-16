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

export const GetReminderTimesFromCurrentTime = () => {
  const reminderTimes: string[] = []

  let newCurrentHour = new Date().getHours()
  for (let i = 0; i < 7; i++) {

    switch (newCurrentHour) {
      case 0:
        reminderTimes.push('12:00 am')
        break
      case 0.5:
        reminderTimes.push('12:30 am')
        break
      case 1:
        reminderTimes.push('1:00 am')
        break
      case 1.5:
        reminderTimes.push('1:30 am')
        break
      case 2:
        reminderTimes.push('2:00 am')
        break
      case 2.5:
        reminderTimes.push('2:30 am')
        break
      case 3:
        reminderTimes.push('3:00 am')
        break
      case 3.5:
        reminderTimes.push('3:30 am')
        break
      case 4:
        reminderTimes.push('4:00 am')
        break
      case 4.5:
        reminderTimes.push('4:30 am')
        break
      case 5:
        reminderTimes.push('5:00 am')
        break
      case 5.5:
        reminderTimes.push('5:30 am')
        break
      case 6:
        reminderTimes.push('6:00 am')
        break
      case 6.5:
        reminderTimes.push('6:30 am')
        break
      case 7:
        reminderTimes.push('7:00 am')
        break
      case 7.5:
        reminderTimes.push('7:30 am')
        break
      case 8:
        reminderTimes.push('8:00 am')
        break
      case 8.5:
        reminderTimes.push('8:30 am')
        break
      case 9:
        reminderTimes.push('9:00 am')
        break
      case 9.5:
        reminderTimes.push('9:30 am')
        break
      case 10:
        reminderTimes.push('10:00 am')
        break
      case 10.5:
        reminderTimes.push('10:30 am')
        break
      case 11:
        reminderTimes.push('11:00 am')
        break
      case 11.5:
        reminderTimes.push('11:30 am')
        break
      case 12:
        reminderTimes.push('12:00 pm')
        break
      case 13:
        reminderTimes.push('1:00 pm')
        break
      case 13.5:
        reminderTimes.push('1:30 pm')
        break
      case 14:
        reminderTimes.push('2:00 pm')
        break
      case 14.5:
        reminderTimes.push('2:30 pm')
        break
      case 15:
        reminderTimes.push('3:00 pm')
        break
      case 15.5:
        reminderTimes.push('3:30 pm')
        break
      case 16:
        reminderTimes.push('4:00 pm')
        break
      case 16.5:
        reminderTimes.push('4:30 pm')
        break
      case 17:
        reminderTimes.push('5:00 pm')
        break
      case 17.5:
        reminderTimes.push('5:30 pm')
        break
      case 18:
        reminderTimes.push('6:00 pm')
        break
      case 18.5:
        reminderTimes.push('6:30 pm')
        break
      case 19:
        reminderTimes.push('7:00 pm')
        break
      case 19.5:
        reminderTimes.push('7:30 pm')
        break
      case 20:
        reminderTimes.push('8:00 pm')
        break
      case 20.5:
        reminderTimes.push('8:30 pm')
        break
      case 21:
        reminderTimes.push('9:00 pm')
        break
      case 21.5:
        reminderTimes.push('9:30 pm')
        break
      case 22:
        reminderTimes.push('10:00 pm')
        break
      case 22.5:
        reminderTimes.push('10:30 pm')
        break
      case 23:
        reminderTimes.push('11:00 pm')
        break
      case 23.5:
        reminderTimes.push('11:30 pm')
        break
      default:
        break
    }

    newCurrentHour += 0.5
  }

  return reminderTimes
}
