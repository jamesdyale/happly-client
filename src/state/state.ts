import { atomWithStorage } from 'jotai/utils'
// import { focusAtom } from 'jotai-optics'
import * as O from 'optics-ts'
import { atom } from 'jotai'
import { DailyHabitType } from '../shared'

export const userAtom = atomWithStorage('user', null)

export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())

export const dailyHabitAtom = atomWithStorage<DailyHabitType[]>('habits', [
  {
    id: '1',
    habitId: '1',
    title: 'Drink water',
    description: 'Drink 2 liters of water',
    reminderOn: true,
    reminderAt: '10:00pm',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '2',
    habitId: '2',
    title: 'Read a book',
    description: 'Lorem Ipsum',
    reminderOn: true,
    reminderAt: '10:00pm',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '3',
    habitId: '3',
    title: 'Go to the gym',
    description: 'Lorem Ipsum',
    reminderOn: true,
    reminderAt: '10:00pm',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '4',
    habitId: '4',
    title: 'Drink water',
    description: 'Lorem Ipsum',
    reminderOn: true,
    reminderAt: '10:00pm',
    progress: 100,
    completed: true,
    info: '1 day streak'
  },
  {
    id: '5',
    habitId: '5',
    title: 'Read a book',
    description: 'Lorem Ipsum',
    reminderOn: true,
    reminderAt: '10:00pm',
    progress: 100,
    completed: true,
    info: '5 days streak'
  }
])

export const selectedHabitAtom = atomWithStorage<DailyHabitType | null>('habitSelected', null)

export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', true)

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
