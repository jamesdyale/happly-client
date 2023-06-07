import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment/moment'
import { useState } from 'react'
import { WeeklyCalendarDateType } from '../../../../../shared'
import { APP_GRAY, APP_WHITE, HABIT_OPTION, MAIN_ACCENT_COLOR } from '../../../../../styles'

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType
  handleDayClick: (day: Date) => void;
  isHighlighed: boolean;
}

export const StreakWeek = (props: IDayOfTheWeek) => {
  const { day, handleDayClick, isHighlighed } = props


  return (
    <TouchableOpacity
      key={day.date.toString()}
      onPress={() => handleDayClick(day.date)}
      style={{
        ...styles.day,
        backgroundColor: isHighlighed ? MAIN_ACCENT_COLOR : APP_WHITE,
        borderColor: isHighlighed ? MAIN_ACCENT_COLOR : APP_GRAY
      }}
    >
      <Text style={{
        ...styles.dayText, color: isHighlighed ? APP_WHITE : HABIT_OPTION
      }}>
        {day.day}
      </Text>
      <Text style={{
        ...styles.dayNumber,
        color: isHighlighed ? APP_WHITE : HABIT_OPTION
      }}>{moment(day.date).format('DD')}</Text>
    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({
  day: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: APP_GRAY,
    padding: 13
  },
  dayText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: HABIT_OPTION
  },
  dayNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: HABIT_OPTION
  }
})

