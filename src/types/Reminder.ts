import { Habit } from './Habit'
import { UniqueId } from '../generators/generateId'

export type Reminder = {
  id: UniqueId<'reminder'>;
  reminderAt: string[];
  habitId: Habit['id'];
};
