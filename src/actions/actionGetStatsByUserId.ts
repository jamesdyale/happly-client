import { collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionGetStatsByUserId = async (userId) => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'stats'),
      where('userId', '==', userId)
    )
  )
}
