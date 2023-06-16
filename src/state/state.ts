import { atomWithStorage } from 'jotai/utils'
import { User, Habit, Stats } from '@data/types'

export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')
export const userAtom = atomWithStorage<User | null>('user', null)
export const selectedDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())
export const dailyHabitsAtom = atomWithStorage<Habit[]>('dailyHabits', [])
export const habitsAtom = atomWithStorage<Habit[]>('habits', [])
export const progressAtom = atomWithStorage<Stats[]>('stats', [])
export const selectedHabitAtom = atomWithStorage<Habit | null>('habitSelected', null)
export const editHabitAtom = atomWithStorage<Habit | null>('editHabit', null)
export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', false)
