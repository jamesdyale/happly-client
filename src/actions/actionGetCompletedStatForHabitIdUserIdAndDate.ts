import { collection, getDocs, query, where, and } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { Habit, User } from '@data/types'

export const ActionGetCompletedStatForHabitIdUserIdAndDate = async (habitId: Habit['id'], date: Date, userId: User['id']) => {
  try {
    return await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        and(where('completedAt', '==', date.toDateString()),
          where('habitId', '==', habitId),
          where('userId', '==', userId))
      )
    )
  } catch (error) {
    console.log('error - ', error)
  }
}
