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
                                          frequencyOption
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
      createdAt: new Date()
    }

    await setDoc(doc(FIREBASE_DB, 'habits', habit.id), habit)

    return habit
  } catch (e) {
    console.error(e)
  }
}
