import { FIREBASE_DB } from '@db/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

export const ActionCreateStat = async (stat) => {
  await setDoc(doc(FIREBASE_DB, 'stats', stat.id), stat)
  return stat
}
