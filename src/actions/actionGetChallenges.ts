import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionGetChallenges = async () => {
  return await getDocs(
    query(
      collection(FIREBASE_DB, 'challenges'),
      orderBy('numberOfParticipants', 'desc')
    )
  )
}
