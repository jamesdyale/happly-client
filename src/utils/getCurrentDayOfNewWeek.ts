import moment from 'moment'


export const getCurrentDayOfNewWeek = (newWeek, selectedDay) => {
  const weekPassed = newWeek.week()
  const selectedDayIndex = moment(selectedDay, 'MMMM Do YYYY').day()

  return moment().week(weekPassed).day(selectedDayIndex).format('MMMM Do YYYY')
}


