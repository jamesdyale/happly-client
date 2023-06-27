import { atomWithStorage } from 'jotai/utils'
import { Habit, Stats, User } from '~types'
import { TimeOfDay } from '~shared'

export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')
export const userAtom = atomWithStorage<User | null>('user', null)
export const selectedDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())
export const dailyHabitsAtom = atomWithStorage<Habit[]>('dailyHabits', [])
export const habitsAtom = atomWithStorage<Habit[]>('habits', [])
export const progressAtom = atomWithStorage<Stats[]>('stats', [])
export const selectedHabitAtom = atomWithStorage<Habit | null>('habitSelected', null)
export const editHabitAtom = atomWithStorage<Habit | null>('editHabit', null)
export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', false)
export const selectedTimeOfDayAtom = atomWithStorage<TimeOfDay>('timeOfDay', TimeOfDay.All)
export const loadingAtom = atomWithStorage<boolean>('loading', false)
export const pushTokenAtom = atomWithStorage<string | null>('pushToken', null)

// {
//   'createdAt': { 'nanoseconds': 611000000, 'seconds': 1687123844 },
//   'dayOfWeek': 'Monday',
//   'description': 'Everyday I want to study Typescript for the next 2 months',
//   'frequencyOption': 'Daily',
//   'id': 'habit-s23F3L2JrlBSD3_f',
//   'name': 'Studying TypeScript',
//   'reminderAt': ['2023-06-18T13:00:00'],
//   'timeOfDay': 'Evening',
//   'userId': 'user-CZJBzF5_PYqkkUfw'
// }
