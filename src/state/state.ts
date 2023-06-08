import { atomWithStorage } from 'jotai/utils'
import { DailyHabitType } from '../shared'
import { User } from '../types/User'
import { Habit } from '../types/Habit'
import { Stats } from '../types/Stats'

export const isFirstLaunchAtom = atomWithStorage('isFirstLaunch', null)
export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')


export const userAtom = atomWithStorage<User | null>('user', null)

export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())

export const dailyHabitAtom = atomWithStorage<Habit[]>('habits', [])
export const progressAtom = atomWithStorage<Stats[]>('stats', [])

export const selectedHabitAtom = atomWithStorage<Habit | null>('habitSelected', null)
export const editHabitAtom = atomWithStorage<Habit | null>('editHabit', null)

export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', true)

export const useClearSelectedHabitAtom = atomWithStorage(null, (get, set) => set(selectedHabitAtom, null))

export const useDeleteHabitAtom = atomWithStorage(null, (get, set) => {
  const habit = get(selectedHabitAtom)
  // if (habit) {
  //   const dailyHabits = get(dailyHabitAtom)
  //   const updatedHabits = dailyHabits.filter((h) => h.habitId !== habit.habitId)
  //   set(dailyHabitAtom, updatedHabits)
  //   set(selectedHabitAtom, null)
  //   set(showDeleteModalAtom, false)
  // }
  return undefined
})
