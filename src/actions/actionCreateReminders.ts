import { doc, setDoc } from 'firebase/firestore'
import { Habit, Reminder, User } from '~types'
import { FIREBASE_DB } from '~data'
import { generateReminderId } from '~generators'
import moment from 'moment'

type ReminderTypes = {
  reminderAt: string[];
  userId: User['id']
  habitId: Habit['id'];
  isDaily: boolean;
  daysOfWeek?: string[];
}

export const ActionCreateReminders = async ({
                                              reminderAt,
                                              userId,
                                              habitId,
                                              isDaily,
                                              daysOfWeek
                                            }: ReminderTypes) => {
  try {
    for (const reminder of reminderAt) {
      const userTime = moment.utc(reminder).format('HH:mm')
      const reminderHour = parseInt(userTime.split(':')[0])
      const reminderMinute = parseInt(userTime.split(':')[1])

      const reminderData: Reminder = {
        id: generateReminderId(),
        reminderHour,
        reminderMinute,
        userId,
        habitId,
        isDaily,
        daysOfWeek: daysOfWeek || []
      }

      await setDoc(doc(FIREBASE_DB, 'reminders', reminderData.id), reminderData)
    }
  } catch (e) {
    console.error(e)
  }
}
