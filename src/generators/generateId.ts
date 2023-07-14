import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

export type UniqueId<Id extends string> = `${Id}-${string}`

export const generateId = <Id extends string>(id: Id): UniqueId<Id> => {
  return `${id}-${nanoid(16)}`
}

export const generateUserId = () => generateId('user')
export const generateStatId = () => generateId('stat')
export const generateStreakId = () => generateId('streak')
export const generateHabitId = () => generateId('habit')
export const generateChallengeId = () => generateId('challenge')
