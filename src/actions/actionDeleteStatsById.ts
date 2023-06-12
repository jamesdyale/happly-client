import { FIREBASE_DB } from '@db/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'

export const ActionDeleteStatsById = async (statsId) => {
  return await deleteDoc(
    doc(FIREBASE_DB, 'stats', statsId)
  )
}
