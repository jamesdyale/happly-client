import { UniqueId } from '../generators/generateId'
import { User } from './User'
import { Habit } from './Habit'

export type Stats = {
  id: UniqueId<'stat'>;
  userId: User['id'];
  habitId: Habit['id'];
  completedAt: string;
  progress: number;
}
