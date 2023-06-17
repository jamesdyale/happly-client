export const checkIfStreakIsValid = (currentStreak, currentDate) => {
  const currentDateObject = new Date(currentDate)
  const currentStreakObject = new Date(currentStreak)

  const beforeCurrentDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() - 1))
  
  const currentStreakTime = currentStreakObject.getTime()
  const beforeCurrentDateTime = beforeCurrentDate.getTime()
  const currentDateTime = currentDateObject.getTime()

  return currentStreakTime === beforeCurrentDateTime || currentStreakTime === currentDateTime
}
