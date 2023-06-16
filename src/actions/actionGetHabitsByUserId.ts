import { collection, query, where, orderBy } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetHabitsByUserId = (userId) => {
  try {
    return query(
      collection(FIREBASE_DB, 'habits'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
