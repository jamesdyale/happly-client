import { doc, setDoc } from "firebase/firestore";
import { Habit, Reminder, User } from "~types";
import { FIREBASE_DB } from "~data";
import { generateReminderId } from "~generators";
import moment from "moment";

type ReminderTypes = {
  reminderAt: string[];
  userId: User["id"];
  habitId: Habit["id"];
  isDaily: boolean;
  daysOfWeek?: string[];
};

export const ActionCreateReminders = async ({
  reminderAt,
  userId,
  habitId,
  isDaily,
  daysOfWeek
}: ReminderTypes) => {
  try {
    // TODO: create a function to check the user's token

    for (const reminder of reminderAt) {
      const normalizedReminder = moment(reminder, "HH:mm A");
      // convert reminder to UTC
      const utcConvertedReminder = moment(reminder).utc().format("HH:mm");
      const utcReminderHour = parseInt(utcConvertedReminder.split(":")[0]);
      const utcReminderMinute = parseInt(utcConvertedReminder.split(":")[1]);

      const reminderData: Reminder = {
        id: generateReminderId(),
        utcReminderMinute,
        utcReminderHour,
        reminder,
        userId,
        habitId,
        isDaily,
        daysOfWeek: daysOfWeek || []
      };

      await setDoc(
        doc(FIREBASE_DB, "reminders", reminderData.id),
        reminderData
      );
    }
  } catch (e) {
    console.error(e);
  }
};
