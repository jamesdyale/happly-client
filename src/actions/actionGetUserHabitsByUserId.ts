import { and, collection, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { User } from '@data/types'


export const ActionGetUserHabitsByUserId = async (userId: User['id'], selectedDay: Date) => {
  try {

    return await getDocs(
      query(
        collection(FIREBASE_DB, 'habits'),
        and(where('userId', '==', userId),
          where('createdAt', '<=', selectedDay))
      )
    )
  } catch (error) {
    console.log('error - ', error)
  }
}

