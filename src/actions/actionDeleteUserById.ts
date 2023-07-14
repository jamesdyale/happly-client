import { FIREBASE_DB } from '~data'
import { deleteDoc, doc } from 'firebase/firestore'

export const ActionDeleteUserById = async (userId) => {
  return await deleteDoc(
    doc(FIREBASE_DB, 'users', userId)
  )
}
