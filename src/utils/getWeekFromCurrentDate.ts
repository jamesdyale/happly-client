import { WeeklyCalendarDateType } from '~types'
import { DAY_NAME_OF_WEEK_SHORT } from '~constants'
import moment from 'moment'


export const getWeekFromCurrentDate = (dayPassed) => {
  const weekPassed = dayPassed.week()
  const week: WeeklyCalendarDateType[] = []
  const todayIndex = moment().day()
  const todayIndexFromWeekPassesd = moment().week(weekPassed).day(todayIndex).format('MMMM Do YYYY')

  DAY_NAME_OF_WEEK_SHORT.forEach((day, index) => {
    const dayPassedIndex = moment().week(weekPassed).day(day).format('MMMM Do YYYY')

    week.push({
      day: day,
      date: moment().week(weekPassed).day(day).format('MMMM Do YYYY'),
      isToday: dayPassedIndex === todayIndexFromWeekPassesd
    })
  })

  return week
}


