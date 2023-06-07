import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { DailyHabitType } from '../shared'
import { User } from '../types/User'
import { Habit } from '@types/Habit'

export const authScreen = atom<'login' | 'register'>('login')
export const userAtom = atom<User | null>('user', null)

export const selectDayOfTheWeekAtom = atom('dayOfTheWeek', new Date())

export const dailyHabitAtom = atom<Habit[]>('habits', [])

export const selectedHabitAtom = atom<DailyHabitType | null>('habitSelected', null)

export const showDeleteModalAtom = atom<boolean>('showDeleteModal', true)

export const useSetSelectedHabitAtom = atom(null, (get, set, habitId: string) => {
  const dailyHabits = get(dailyHabitAtom) // TODO: should be replaced with endpoint call
  const habit = dailyHabits.find((habit) => habit.habitId === habitId)
  if (habit) {
    return set(selectedHabitAtom, habit)
  }
  return undefined
})

export const useClearSelectedHabitAtom = atom(null, (get, set) => set(selectedHabitAtom, null))

export const useDeleteHabitAtom = atom(null, (get, set) => {
  const habit = get(selectedHabitAtom)
  if (habit) {
    const dailyHabits = get(dailyHabitAtom)
    const updatedHabits = dailyHabits.filter((h) => h.habitId !== habit.habitId)
    set(dailyHabitAtom, updatedHabits)
    set(selectedHabitAtom, null)
    set(showDeleteModalAtom, false)
  }
  return undefined
})
