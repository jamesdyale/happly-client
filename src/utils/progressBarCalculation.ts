export const progressBarCalculation = (habits: any[]): number => {
  //FIXME: change the habit type to HabitType instead of any
  const totalHabits = habits.length
  const completedHabits = habits.filter((habit) => habit.completed).length
  return Math.round((completedHabits / totalHabits) * 100)
}

