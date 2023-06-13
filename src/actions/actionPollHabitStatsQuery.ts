import { and, collection, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { Habit, User } from '@data/types'

export const ActionPollHabitStatsQuery = (habitId: Habit['id'], userId: User['id'], day) => {
  return query(
    collection(FIREBASE_DB, 'stats'),
    and(where('completedAt', '==', day),
      where('habitId', '==', habitId),
      where('userId', '==', userId))
  )
}
