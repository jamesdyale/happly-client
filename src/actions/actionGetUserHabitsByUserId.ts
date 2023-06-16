import { and, collection, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { User } from '@data/types'
import { TimeOfDay } from '@shared/types'

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

