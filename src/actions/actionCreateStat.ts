import { FIREBASE_DB } from '~data'
import { doc, setDoc } from 'firebase/firestore'

export const ActionCreateStat = async (stat) => {
  try {
    await setDoc(doc(FIREBASE_DB, 'stats', stat.id), stat)
    return stat
  } catch (error) {
    console.log(error)
  }
}
