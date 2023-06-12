import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionGetUserByUID = async (uid) => {
  return await getDoc(doc(FIREBASE_DB, 'users', uid))
}
