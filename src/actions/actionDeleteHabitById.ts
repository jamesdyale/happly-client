import { FIREBASE_DB } from '@data/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'

export const ActionDeleteHabitById = async (habitId) => {
  return await deleteDoc(
    doc(FIREBASE_DB, 'habits', habitId)
  )
}
