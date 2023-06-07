import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { DailyHabitType } from '../shared'
import { User } from '../types/User'
import { Habit } from '../types/Habit'

export const isFirstLaunchAtom = atomWithStorage('isFirstLaunch', null)
export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')


export const userAtom = atomWithStorage<User | null>('user', null)

export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())

export const dailyHabitAtom = atomWithStorage<Habit[]>('habits', [])

export const selectedHabitAtom = atomWithStorage<DailyHabitType | null>('habitSelected', null)

export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', true)

export const useSetSelectedHabitAtom = atomWithStorage(null, (get, set, habitId: string) => {
  const dailyHabits = get(dailyHabitAtom) // TODO: should be replaced with endpoint call
  // const habit = dailyHabits.find((habit) => habit.habitId === habitId)
  // if (habit) {
  //   return set(selectedHabitAtom, habit)
  // }
  // return undefined
})

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
