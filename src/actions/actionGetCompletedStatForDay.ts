import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetCompletedStatForDay = (selectedDay: Date) => {
  try {
    return query(
      collection(FIREBASE_DB, 'stats'),
      where('completedAt', '==', selectedDay.toDateString())
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
