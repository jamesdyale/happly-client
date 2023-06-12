import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'

export const ActionGetStatsByHabitId = async (habitId) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'stats'),
      where('habitId', '==', habitId)
    )
  )

}
