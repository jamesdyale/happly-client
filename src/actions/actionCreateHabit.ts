import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Habit } from '../data/types/Habit'

export const ActionCreateHabit = async ({
                                          id,
                                          name,
                                          description,
                                          userId,
                                          timeOfDay,
                                          dayOfWeek,
                                          frequencyOption
                                        }) => {
  const habit: Habit = {
    id,
    name,
    description,
    userId,
    timeOfDay,
    dayOfWeek,
    frequencyOption
  }

  await setDoc(doc(FIREBASE_DB, 'habits', habit.id), habit)

  return habit
}
