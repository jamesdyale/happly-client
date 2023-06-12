import { FIREBASE_DB } from '@db/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export const ActionGetStatsById = async (statsId) => {
  return await getDoc(
    doc(FIREBASE_DB, 'stats', statsId)
  )
}
