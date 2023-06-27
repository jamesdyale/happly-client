import { WeeklyCalendarDateType } from '~types'
import { DAY_NAME_OF_WEEK_SHORT } from '~constants'

export const getLast7Days = (): WeeklyCalendarDateType[] => {
  const today = new Date()
  const week = []

  for (let i = 0; i < 7; i++) {
    const newDay = new Date()
    newDay.setDate(today.getDate() - i)
    week.push({ day: DAY_NAME_OF_WEEK_SHORT[newDay.getDay()], date: newDay, isToday: i === 0 })
  }

  return week
}
