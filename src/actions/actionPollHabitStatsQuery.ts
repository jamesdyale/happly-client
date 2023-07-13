import { and, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { Habit, User } from '~types'
import { FIREBASE_DB } from '~data'
import moment from 'moment'

export const ActionPollHabitStatsQuery = (habitId: Habit['id'], userId: User['id'], date: string) => {
  return query(
    collection(FIREBASE_DB, 'stats'),
    and(
      where('habitId', '==', habitId),
      where('userId', '==', userId),
      where('completedAt', '==', moment(date, 'MMMM Do YYYY').format('ddd MMM DD YYYY'))
    )
  )
}
