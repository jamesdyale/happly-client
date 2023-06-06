import { User } from '@types/User'
import { Habit } from '@types/Habit'

export type Stats = {
  id: string;
  userId: User['id'];
  habitId: Habit['id'];
  completedAt: string;
  progress: number;
}
