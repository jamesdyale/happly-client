import { UniqueId } from '../generators/generateId'
import { User } from './User'
import { DayOfTheWeek, Frequency, TimeOfDay } from '@shared/types'

export type Habit = {
  id: UniqueId<'habit'>;
  name: string;
  description: string;
  userId: User['id'];
  timeOfDay: TimeOfDay;
  dayOfWeek: DayOfTheWeek;
  frequencyOption: Frequency;
  createdAt: Date;
  reminderAt: string[];
}
