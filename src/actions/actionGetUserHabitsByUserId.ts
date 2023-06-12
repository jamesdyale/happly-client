import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetUserHabitsByUserId = async (userId) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'habits'),
      where('userId', '==', userId)
    )
  )
}
