import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Habit } from '../types/Habit'

export const ActionCreateOrUpdateStreak = async (habitId) => {
  // get the streak for this habit

  // if there is no streak, create one

  // if there is a streak,
  // check if the current date is one day after the last day of the streak
  // if it is, increment the streak count
  // if it is not, reset the streak count to 1

  // if the streak count is greater than the longest streak, update the longest streak
  // if the streak count is less than the longest streak, do nothing

  // update the last updated date to the current date

  // save the streak to the database

  // return the streak
  

}
