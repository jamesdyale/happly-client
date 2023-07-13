import { Habit } from '~types/Habit'
import { Stats } from '~types/Stats'

export type HabitHistory = {
  [habitId: string]: {
    habit: Habit,
    stats: Stats[]
  }
}
