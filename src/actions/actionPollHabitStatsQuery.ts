import { and, collection, query, where } from 'firebase/firestore'
import { Habit, User } from '~types'
import { FIREBASE_DB } from '~data'

export const ActionPollHabitStatsQuery = (habitId: Habit['id'], userId: User['id'], day) => {
  return query(
    collection(FIREBASE_DB, 'stats'),
    and(where('completedAt', '==', day),
      where('habitId', '==', habitId),
      where('userId', '==', userId))
  )
}
