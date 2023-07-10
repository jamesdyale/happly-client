import { WeeklyCalendarDateType } from '~types'
import { DAY_NAME_OF_WEEK_SHORT } from '~constants'
import moment from 'moment'


export const getWeekFromCurrentDate = (): WeeklyCalendarDateType[] => {
  const today = moment().format('MMMM Do YYYY')
  // const todayIndex = today.getDay()
  // console.log('todayIndex - ', todayIndex)
  console.log('today - ', today)
  const week = []

  // DAY_NAME_OF_WEEK_SHORT.forEach((day, index) => {
  //   const newDay = new Date()
  //   if (index < todayIndex) {
  //     newDay.setDate(today.getDate() - (todayIndex - index))
  //   } else if (index > todayIndex) {
  //     newDay.setDate(today.getDate() + (index - todayIndex))
  //   } else if (index === todayIndex) {
  //     newDay.setDate(today.getDate())
  //   }
  //   week.push({ day, date: newDay, isToday: index === todayIndex })
  // })

  return week
}


