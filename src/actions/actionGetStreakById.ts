import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'

export const ActionGetStreakById = async (id) => {
  return await getDoc(doc(FIREBASE_DB, 'streaks', id))
}
