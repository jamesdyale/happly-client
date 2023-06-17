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

export const findClosestReminder = (reminders) => {
  const now = new Date()
  const nowTime = now.getTime()

  let convertedReminders = []

  reminders.map((reminder) => {
    let parts = reminder.split(/\s/)
    let hour = parseInt(parts[0].split(':')[0])
    let minute = parseInt(parts[0].split(':')[1])
    let AMPM = parts[1]

    if (AMPM == 'pm' && hour < 12) hour += 12
    if (AMPM == 'am' && hour == 12) hour -= 12

    let reminderTime = new Date()
    reminderTime.setHours(hour)
    reminderTime.setMinutes(minute)
    reminderTime.setSeconds(0)
    reminderTime.setMilliseconds(0)

    convertedReminders.push(reminderTime.getTime())
  })

  let closestReminderDifference = convertedReminders[0] - nowTime
  let closestReminder = 0

  convertedReminders.map((reminder, index) => {
    if (index == 0) return

    const reminderDifference = reminder - nowTime

    if (closestReminderDifference < 0 && reminderDifference > 0) {
      closestReminderDifference = reminderDifference
      closestReminder = reminder
    }

    if (reminderDifference < closestReminderDifference && reminderDifference > 0) {
      closestReminderDifference = reminderDifference
      closestReminder = reminder
    }
  })

  let closestReminderTime = formatAMPM(new Date(closestReminder))

  return closestReminderTime
}
