import { Habit } from './Habit'
import { UniqueId } from '~generators'
import { User } from '~types/User'

export type Reminder = {
  id: UniqueId<'reminder'>;
  utcReminderHour: number; // this should be in UTC
  utcReminderMinute: number; // this should be in UTC
  reminder: string;
  userId: User['id'];
  habitId: Habit['id'];
  isDaily: boolean;
  daysOfWeek: string[];
};
