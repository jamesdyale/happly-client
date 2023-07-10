import { collection, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'
import { User } from '~types'

export const ActionGetCompletedStatForDay = (userId: User['id']) => {
  try {
    return query(
      collection(FIREBASE_DB, 'stats'),
      where('userId', '==', userId)
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
