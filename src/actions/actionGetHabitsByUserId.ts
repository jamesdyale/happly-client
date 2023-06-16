import { collection, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetHabitsByUserId = (userId) => {
  try {
    return query(
      collection(FIREBASE_DB, 'habits'),
      where('userId', '==', userId)
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
