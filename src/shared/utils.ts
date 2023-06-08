import { WeeklyCalendarDateType } from './types'

export const progressBarStatus = (progress: number): string => {
  switch (true) {
    case progress < 20:
      return 'Let\'s start!'
    case progress >= 20 && progress < 30:
      return 'Momentum is building!'
    case progress >= 30 && progress < 40:
      return 'Momentum is building!'
    case progress >= 40 && progress < 50:
      return 'You\'re almost there!'
    case progress >= 50 && progress < 60:
      return 'You\'re almost there. Keep going!'
    case progress >= 60 && progress < 70:
      return 'More than half way there!'
    case progress >= 70 && progress < 80:
      return 'More than half way there!'
    case progress >= 80 && progress < 90:
      return 'More than half way there!'
    case progress >= 90 && progress < 100:
      return 'Let\'s finish it!'
    case progress > 99:
      return 'Woohoo! You\'ve completed your habits today!'
    default:
      return ''
  }
}

export const percentage = (progress, dailyHabits) => {
  const completedHabits = []
  const stats = new Map(progress.map((item) => [item.habitId, item]))
  const totalHabits = dailyHabits.length
  dailyHabits.map((habit) => {
    if (stats.has(habit.id)) {
      completedHabits.push(stats.get(habit.id))
    }
  })
  return Math.round((completedHabits.length / totalHabits) * 100)
}

export const progressBarCalculation = (habits: any[]): number => {
  //FIXME: change the habit type to HabitType instead of any
  const totalHabits = habits.length
  const completedHabits = habits.filter((habit) => habit.completed).length
  return Math.round((completedHabits / totalHabits) * 100)
}

export const DAY_NAME_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getWeekFromCurrentDate = (): WeeklyCalendarDateType[] => {
  const today = new Date()
  const todayIndex = today.getDay()
  const week = []

  DAY_NAME_OF_WEEK_SHORT.forEach((day, index) => {
    const newDay = new Date()
    if (index < todayIndex) {
      newDay.setDate(today.getDate() - (todayIndex - index))
    } else if (index > todayIndex) {
      newDay.setDate(today.getDate() + (index - todayIndex))
    } else if (index === todayIndex) {
      newDay.setDate(today.getDate())
    }
    week.push({ day, date: newDay, isToday: index === todayIndex })
  })

  return week
}

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
