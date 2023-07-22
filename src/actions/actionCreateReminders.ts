import { doc, setDoc } from 'firebase/firestore'
import { Habit, Reminder, User } from '~types'
import { FIREBASE_DB } from '~data'
import { generateReminderId } from '~generators'

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
      const [userHour, userMinute] = reminder.split('T')[1].split(':').map((part) => parseInt(part.trim(), 10))
      const userTime = new Date(reminder)
      userTime.setHours(userHour, userMinute, 0)
      const reminderHour = userTime.getHours()
      const reminderMinute = userTime.getMinutes()

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
