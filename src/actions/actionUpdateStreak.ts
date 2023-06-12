import { Streak } from '@data/types'
import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@data/firebaseConfig'

export const ActionUpdateStreak = async (streak: Streak) => {
  try {
    await setDoc(doc(FIREBASE_DB, 'streak', streak.id), streak)
  } catch (error) {
    console.error(error)
  }
}
