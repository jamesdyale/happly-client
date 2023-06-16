import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { Habit } from '@data/types'

export const ActionCreateHabit = async ({
                                          id,
                                          name,
                                          description,
                                          userId,
                                          timeOfDay,
                                          dayOfWeek,
                                          frequencyOption,
                                          createdAt
                                        }) => {
  try {
    const habit: Habit = {
      id,
      name,
      description,
      userId,
      timeOfDay,
      dayOfWeek,
      frequencyOption,
      createdAt
    }

    await setDoc(doc(FIREBASE_DB, 'habits', habit.id), habit)

    return habit
  } catch (e) {
    console.error(e)
  }
}
