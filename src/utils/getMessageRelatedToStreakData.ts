import { Streak } from '~types'

export const getMessageRelatedToStreakData = (streak: Streak): string => {
  if (streak.count === 0) {
    return `Complete today to have your first streak! You got this!`
  } else if (streak.count >= 1 && streak.count <= 3) {
    return `🚀 You're on a ${streak.count} day streak! Great start! Keep pushing forward!`
  } else if (streak.count >= 4 && streak.count <= 7) {
    return `🔥 You're on a ${streak.count} day streak! You're doing awesome! Keep it up!`
  } else if (streak.count >= 8 && streak.count <= 14) {
    return `💪 You're on a ${streak.count} day streak! Amazing dedication! Keep the momentum going!`
  } else if (streak.count >= 15) {
    return `🎉 You're on a ${streak.count} day streak! Unstoppable! Keep shining!`
  }

  // If the streak count doesn't fall into any of the above ranges, return a default message.
  return `Keep going! You got this!`
}
