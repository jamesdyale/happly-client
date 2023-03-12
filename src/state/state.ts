import { atomWithStorage } from 'jotai/utils'

export const selectDayOfTheWeekAtom = atomWithStorage('dayOfTheWeek', new Date())
