import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '~data'


export const ActionDeleteRemindersByHabitId = async (habitId) => {
  const remindersQuerySnapshot = await getDocs(
    query(
      collection(FIREBASE_DB, 'reminders'),
      where('habitId', '==', habitId)
    )
  )

  if (remindersQuerySnapshot.empty) {
    return
  }

  remindersQuerySnapshot.docs.map(async (reminder) => {
    // delete reminders
    await deleteDoc(doc(FIREBASE_DB, 'reminders', reminder.id))
  })

  return 'Deleted reminders'
}

