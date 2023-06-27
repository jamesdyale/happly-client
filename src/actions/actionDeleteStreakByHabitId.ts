import { deleteDoc, doc } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'
import { ActionGetStreakByHabitId } from '~actions'


export const ActionDeleteStreakByHabitId = async (habitId) => {
  const streakQuerySnapshot = await ActionGetStreakByHabitId(habitId)

  if (streakQuerySnapshot.empty) {
    return
  }

  const streak = streakQuerySnapshot.docs[0].data()

  // delete the streak
  return await deleteDoc(
    doc(FIREBASE_DB, 'streak', streak.id)
  )

}
