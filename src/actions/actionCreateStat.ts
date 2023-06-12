import { FIREBASE_DB } from '@data/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export const ActionCreateStat = async (stat) => {
  await setDoc(doc(FIREBASE_DB, 'stats', stat.id), stat)
  return stat
}
