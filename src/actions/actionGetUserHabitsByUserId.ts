import { and, collection, query, where } from 'firebase/firestore'
import { TimeOfDay, User } from '~types'
import { FIREBASE_DB } from '~data'
import { Moment } from 'moment'

export const ActionGetUserHabitsByUserId = (userId: User['id']) => {
  try {
    return query(
      collection(FIREBASE_DB, 'habits'),
      where('userId', '==', userId)
    )
  } catch (error) {
    console.log('error - ', error)
  }
}

