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
