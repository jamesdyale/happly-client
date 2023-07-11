import { and, collection, query, where } from 'firebase/firestore'
import { TimeOfDay, User } from '~types'
import { FIREBASE_DB } from '~data'

export const ActionGetUserHabitsByUserId = (userId: User['id'], timeOfDay: TimeOfDay) => {
  try {
    if (timeOfDay === TimeOfDay.All) {
      return query(
        collection(FIREBASE_DB, 'habits'),
        where('userId', '==', userId)
      )
    } else {
      return query(
        collection(FIREBASE_DB, 'habits'),
        and(
          where('userId', '==', userId),
          where('timeOfDay', '==', timeOfDay)
        )
      )
    }

  } catch (error) {
    console.log('error - ', error)
  }
}

