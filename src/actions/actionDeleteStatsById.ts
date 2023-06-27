import { deleteDoc, doc } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionDeleteStatsById = async (statsId) => {
  return await deleteDoc(
    doc(FIREBASE_DB, 'stats', statsId)
  )
}
