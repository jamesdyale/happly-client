import { atomWithStorage } from 'jotai/utils'
// import { focusAtom } from 'jotai-optics'
// import * as O from 'optics-ts'
import { DailyHabitType } from '../shared'

export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())

export const isHabitSelectedAtom = atomWithStorage('isHabitSelected', true)

export const habitSelectedAtom = atomWithStorage('habitSelected', '1')

export const dailyHabitAtom = atomWithStorage<DailyHabitType[]>('habits', [
  {
    id: '1',
    habitId: '1',
    title: 'Drink water',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '2',
    habitId: '2',
    title: 'Read a book',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '3',
    habitId: '3',
    title: 'Go to the gym',
    progress: 0,
    completed: false,
    info: 'Abc'
  },
  {
    id: '4',
    habitId: '4',
    title: 'Drink water',
    progress: 100,
    completed: true,
    info: '1 day streak'
  },
  {
    id: '5',
    habitId: '5',
    title: 'Read a book',
    progress: 100,
    completed: true,
    info: '5 days streak'
  }
])
