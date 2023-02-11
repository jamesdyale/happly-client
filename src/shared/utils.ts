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

export const progressBarCalculation = (habits: any[]): number => {
  //FIXME: change the habit type to HabitType instead of any
  const totalHabits = habits.length
  const completedHabits = habits.filter((habit) => habit.completed).length
  return Math.round((completedHabits / totalHabits) * 100)
}