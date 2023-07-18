import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'
import { Habit } from '~types'

export const ActionDeleteReminder = async ({ habitId }: {
  habitId: Habit['id'];
}) => {
  try {
    const reminderDB = await getDocs(
      query(
        collection(FIREBASE_DB, 'reminders'),
        where('habitId', '==', habitId)
      )
    )

    if (reminderDB.empty) {
      return
    }

    for (const doc1 of reminderDB.docs) {
      await deleteDoc(doc(FIREBASE_DB, 'reminders', doc1.data().id))
    }
  } catch (e) {
    console.error(e)
  }
}
