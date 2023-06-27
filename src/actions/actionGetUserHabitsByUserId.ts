import { and, collection, query, where } from 'firebase/firestore'
import { TimeOfDay, User } from '~types'
import { FIREBASE_DB } from '~data'

export const ActionGetUserHabitsByUserId = (userId: User['id'], selectedDay: Date, timeOfDay: TimeOfDay) => {
  try {
    if (timeOfDay === TimeOfDay.All) {
      return query(
        collection(FIREBASE_DB, 'habits'),
        and(where('userId', '==', userId),
          where('createdAt', '<=', selectedDay)
        )
      )
    } else {
      return query(
        collection(FIREBASE_DB, 'habits'),
        and(where('userId', '==', userId),
          where('createdAt', '<=', selectedDay),
          where('timeOfDay', '==', timeOfDay)
        )
      )
    }
  } catch (error) {
    console.log('error - ', error)
  }
}

