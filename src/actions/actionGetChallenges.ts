import { collection, orderBy, query } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'

export const ActionGetChallenges = () => {
  try {
    return query(
      collection(FIREBASE_DB, 'challenges'),
      orderBy('numberOfParticipants', 'desc')
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
