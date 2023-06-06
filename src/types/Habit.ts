import { UniqueId } from '../generators/generateId'
import { User } from './User'

export type Habit = {
  id: UniqueId<'habit'>;
  name: string;
  description: string;
  userId: User['id'];
  timeOfDay: string; //FIXME: change to enum
  duration: string;
  dayOfWeek: string; //FIXME: change to enum
}
