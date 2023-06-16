import { doc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetUserHabitByIdDoc = (habitId) => {
  return doc(FIREBASE_DB, 'habits', habitId)
}
