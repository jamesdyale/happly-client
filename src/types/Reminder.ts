import { Habit } from './Habit'
import { UniqueId } from '../generators/generateId'
import { User } from '~types/User'

export type Reminder = {
  id: UniqueId<'reminder'>;
  reminderAt: string; // this should be in UTC
  userId: User['id'];
  habitId: Habit['id'];
  token: string;
};
