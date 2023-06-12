import { atomWithStorage } from 'jotai/utils'
import { User } from '../data/types/User'
import { Habit } from '../data/types/Habit'
import { Stats } from '../data/types/Stats'

export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')
export const userAtom = atomWithStorage<User | null>('user', null)
export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())
export const dailyHabitsAtom = atomWithStorage<Habit[]>('dailyHabits', [])
export const habitsAtom = atomWithStorage<Habit[]>('habits', [])
export const progressAtom = atomWithStorage<Stats[]>('stats', [])
export const selectedHabitAtom = atomWithStorage<Habit | null>('habitSelected', null)
export const editHabitAtom = atomWithStorage<Habit | null>('editHabit', null)
export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', false)
