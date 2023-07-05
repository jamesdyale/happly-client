import { doc, setDoc } from 'firebase/firestore'
import { Habit } from '~types'
import { FIREBASE_DB } from '~data'


export const ActionCreateHabit = async ({
                                          id,
                                          name,
                                          description,
                                          userId,
                                          timeOfDay,
                                          selectedDays,
                                          frequencyOption,
                                          createdAt,
                                          reminderAt
                                        }) => {
  try {
    const habit: Habit = {
      id,
      name,
      description,
      userId,
      timeOfDay,
      selectedDays,
      frequencyOption,
      createdAt,
      reminderAt
    }

    await setDoc(doc(FIREBASE_DB, 'habits', habit.id), habit)

    return habit
  } catch (e) {
    console.error(e)
  }
}
