import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { ActionGetStreakByHabitId } from '@actions/actionGetStreakByHabitId'
import { generateStreakId } from '../generators/generateId'
import { Habit, User, Streak } from '@data/types'

export const ActionCreateOrUpdateStreak = async (habitId: Habit['id'], userId: User['id']) => {
  try {
    // get the streak for this habit
    const streakQuerySnapshot = await ActionGetStreakByHabitId(habitId)

    if (streakQuerySnapshot.empty) {
      // if there is no streak, create one
      const streak: Streak = {
        id: generateStreakId(),
        habitId,
        userId,
        count: 1,
        longestStreak: 1,
        startDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
      await setDoc(doc(FIREBASE_DB, 'streak', streak.id), streak)
      return
    } else {
      const streak = streakQuerySnapshot.docs[0].data() as Streak

      // check if the current date is one day after the last day of the streak
      const currentDate = new Date()
      const lastUpdatedDate = new Date(streak.lastUpdated)
      const isOneDayAfterLastUpdatedDate = currentDate.getDate() - lastUpdatedDate.getDate() === 1

      // if it is, create a stat for the last day of the streak
      if (isOneDayAfterLastUpdatedDate) {
        // if it is, increment the streak count
        const updatedStreak: Streak = {
          ...streak,
          count: streak.count + 1
        }

        // if the streak count is greater than the longest streak, update the longest streak
        if (updatedStreak.count > updatedStreak.longestStreak) {
          updatedStreak.longestStreak = updatedStreak.count
        }

        // update the last updated date to the current date
        updatedStreak.lastUpdated = new Date().toISOString()

        // save the streak to the database
        await setDoc(doc(FIREBASE_DB, 'streak', updatedStreak.id), updatedStreak)
      } else {
        // if it is not, reset the streak count to 1
        const updatedStreak: Streak = {
          ...streak,
          count: 1
        }

        // update the last updated date to the current date
        updatedStreak.lastUpdated = new Date().toISOString()

        // save the streak to the database
        await setDoc(doc(FIREBASE_DB, 'streak', updatedStreak.id), updatedStreak)
      }
    }

  } catch (error) {
    console.error(error)
  }

}
