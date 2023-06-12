import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'

export const ActionGetStreakByHabitId = async (habitId) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'streaks'),
      where('habitId', '==', habitId)
    )
  )

}
