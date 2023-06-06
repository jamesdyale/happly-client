import { Habit } from '@types/Habit'

export type Reminder = {
  id: string;
  reminderAt: string[];
  habitId: Habit['id'];
};
