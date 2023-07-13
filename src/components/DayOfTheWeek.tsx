import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment/moment'
import { WeeklyCalendarDateType } from '~types'
import { useTheme } from '~hooks'

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType
  selectedDay: string;
  handleDayClick: (day: string) => void;
}

export const DayOfTheWeek = (props: IDayOfTheWeek) => {
  const { theme } = useTheme()

  const { day, handleDayClick, selectedDay } = props
  const isSelected = day.date === selectedDay
  const dayNumber = moment(day.date, 'MMMM Do YYYY')

  return (
    <TouchableOpacity
      onPress={() => handleDayClick(day.date)}
      style={[
        styles.day,
        {
          backgroundColor: isSelected ? theme.MAIN_ACCENT_COLOR : theme.APP_WHITE,
          borderColor: isSelected ? theme.MAIN_ACCENT_COLOR : theme.APP_GRAY
        }]
      }
    >
      <Text style={[styles.dayText, { color: isSelected ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.HABIT_OPTION }]}>
        {day.day}
      </Text>
      <Text
        style={[styles.dayNumber, { color: isSelected ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.HABIT_OPTION }]}>
        {moment(dayNumber).format('D')}</Text>
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
    padding: 13
  },
  dayText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10
  },
  dayNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16
  }
})

