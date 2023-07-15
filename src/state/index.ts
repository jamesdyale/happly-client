import { atomWithStorage } from 'jotai/utils'
import { Habit, HabitHistory, Stats, TColors, TimeOfDay, User } from '~types'
import moment from 'moment'
import { ChallengeType } from '~types/ChallengeType'


export const authFlowAtom = atomWithStorage<'login' | 'register'>('authFlow', 'register')
export const userAtom = atomWithStorage<User | null>('user', null)
export const selectedDayOfTheWeekAtom = atomWithStorage<string>('dayOfTheWeek', moment().format('MMMM Do YYYY'))
export const dailyHabitsAtom = atomWithStorage<Habit[]>('dailyHabits', [])
export const habitsAtom = atomWithStorage<HabitHistory | null>('habits', null)
export const progressAtom = atomWithStorage<Stats[]>('stats', [])
export const selectedHabitAtom = atomWithStorage<Habit | null>('habitSelected', null)
export const editHabitAtom = atomWithStorage<Habit | null>('editHabit', null)
export const showDeleteModalAtom = atomWithStorage<boolean>('showDeleteModal', false)
export const selectedTimeOfDayAtom = atomWithStorage<TimeOfDay>('timeOfDay', TimeOfDay.All)
export const loadingAtom = atomWithStorage<boolean>('loading', false)
export const isAppReadyAtom = atomWithStorage<boolean>('isAppReady', false)
export const isUserOnboardedAtom = atomWithStorage<boolean>('isUserOnboarded', false)
export const themeAtom = atomWithStorage<TColors | null>('theme', null)
export const challengesAtom = atomWithStorage<ChallengeType[] | null>('challenges', null)
