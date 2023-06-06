import { User } from '@types/User'

export type Habit = {
  id: string;
  name: string;
  description: string;
  userId: User['id'];
  timeOfDay: string; //FIXME: change to enum
  duration: string;
  dayOfWeek: string; //FIXME: change to enum
}
