import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'

export const ActionGetCompletedHabitForDay = async (selectedDay) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'stats'),
      where('completedAt', '==', selectedDay.toDateString())
    )
  )
}
