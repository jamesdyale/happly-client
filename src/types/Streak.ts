import { Habit } from '@types/Habit'
import { User } from '@types/User'

export type Streak = {
  id: string;
  habitId: Habit['id'];
  userId: User['id'];
  count: number;
  longestStreak: number;
  startDate: string;
  lastUpdated: string;
}
