import { WeeklyCalendarDateType } from '~types'
import { DAY_NAME_OF_WEEK_SHORT } from '~constants'
import moment from 'moment'


export const getWeekFromCurrentDate = () => {
  const week: WeeklyCalendarDateType[] = []
  const todayIndex = moment().day()

  DAY_NAME_OF_WEEK_SHORT.forEach((day, index) => {
    if (index < todayIndex) {
      week.push({
        day: day,
        date: moment().subtract(todayIndex - index, 'days').format('MMMM Do YYYY'),
        isToday: false
      })
    } else if (index === todayIndex) {
      week.push({
        day: day,
        date: moment().format('MMMM Do YYYY'),
        isToday: true
      })
    } else {
      week.push({
        day: day,
        date: moment().add(index - todayIndex, 'days').format('MMMM Do YYYY'),
        isToday: false
      })
    }
  })

  return week
}


