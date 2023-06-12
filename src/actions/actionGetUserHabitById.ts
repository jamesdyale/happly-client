import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetUserHabitById = async (habitId) => {
  return await getDoc(
    doc(FIREBASE_DB, 'habits', habitId)
  )
}
