import { doc } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionGetUserHabitByIdDoc = (habitId) => {
  return doc(FIREBASE_DB, 'habits', habitId)
}
