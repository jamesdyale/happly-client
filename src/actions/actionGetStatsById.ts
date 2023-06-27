import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionGetStatsById = async (statsId) => {
  return await getDoc(
    doc(FIREBASE_DB, 'stats', statsId)
  )
}
