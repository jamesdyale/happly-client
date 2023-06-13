import { doc, setDoc } from 'firebase/firestore'
import { ActionGetStreakByHabitId } from '@actions/actionGetStreakByHabitId'
import { generateStreakId } from '../generators/generateId'
import { Habit, User, Streak } from '@data/types'
import { FIREBASE_DB } from '@data/firebaseConfig'
import { checkIfStreakIsValid } from '@utils/compareDates'

export const ActionCreateOrUpdateStreak = async (habitId: Habit['id'], userId: User['id']) => {
  try {
    console.log('hey there')
    // get the streak for this habit
    const streakQuerySnapshot = await ActionGetStreakByHabitId(habitId)

    if (streakQuerySnapshot.empty) {
      // if there is no streak, create one
      const streak: Streak = {
        id: generateStreakId(),
        habitId,
        userId,
        count: 0,
        longestStreak: 0,
        startDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
      await setDoc(doc(FIREBASE_DB, 'streak', streak.id), streak)
      return
    }

    const streak = streakQuerySnapshot.docs[0].data() as Streak

    // check if the current date is one day after the last day of the streak
    const currentDate = new Date()
    const lastUpdatedDate = new Date(streak.lastUpdated)
    const isOneDayAfterLastUpdatedDate = currentDate.getDate() - lastUpdatedDate.getDate() === 1
    console.log('currentDate', currentDate)
    console.log('lastUpdatedDate', lastUpdatedDate)

    const validStreak = checkIfStreakIsValid(
      lastUpdatedDate.toISOString().split('T')[0],
      currentDate.toISOString().split('T')[0])

    // if it is, create a stat for the last day of the streak
    if (validStreak) {
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
      return
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
      return
    }


  } catch (error) {
    console.error(error)
  }

}
