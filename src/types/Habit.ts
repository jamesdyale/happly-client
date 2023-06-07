import { UniqueId } from '../generators/generateId'
import { User } from './User'
import { DayOfTheWeek, TimeOfDay } from '@shared/types'

export type Habit = {
  id: UniqueId<'habit'>;
  name: string;
  description: string;
  userId: User['id'];
  timeOfDay: TimeOfDay;
  duration: string;
  dayOfWeek: DayOfTheWeek;
}
