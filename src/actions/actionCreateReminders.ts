import { doc, setDoc } from 'firebase/firestore'
import { Habit, User } from '~types'
import { FIREBASE_DB } from '~data'
import { generateReminderId } from '~generators'

type ReminderTypes = {
  reminderAt: string[];
  userId: User['id']
  habitId: Habit['id'];
}

export const ActionCreateReminders = async ({
                                              reminderAt,
                                              userId,
                                              habitId
                                            }: ReminderTypes) => {
  try {
    for (const reminder of reminderAt) {
      const [userHour, userMinute] = reminder.split('T')[1].split(':').map((part) => parseInt(part.trim(), 10))
      const userTime = new Date(reminder)
      userTime.setHours(userHour, userMinute, 0)

      const reminderData = {
        id: generateReminderId(),
        reminderAt: userTime,
        userId,
        habitId
      }

      await setDoc(doc(FIREBASE_DB, 'reminders', reminderData.id), reminderData)
    }
  } catch (e) {
    console.error(e)
  }
}
