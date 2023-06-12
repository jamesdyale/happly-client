export const checkIfStreakIsValid = (currentStreak, currentDate) => {
  const currentDateObject = new Date(currentDate)
  const currentStreakObject = new Date(currentStreak)

  const beforeCurrentDate = new Date(currentDate).setDate(new Date(currentDate).getDate() - 1)
  const currentDateTime = currentDateObject.getTime()
  const currentStreakTime = currentStreakObject.getTime()

  return (currentDateTime - currentStreakTime === 0) || (beforeCurrentDate === currentStreakTime)
}
