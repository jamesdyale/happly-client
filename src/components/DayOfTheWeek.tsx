import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment/moment'
import { WeeklyCalendarDateType } from '~types'
import { APP_GRAY, APP_WHITE, HABIT_OPTION, MAIN_ACCENT_COLOR } from '~styles'

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType
  selectedDay: Date;
  handleDayClick: (day: Date) => void;
}

export const DayOfTheWeek = (props: IDayOfTheWeek) => {
  const { day, handleDayClick, selectedDay } = props
  const dateFromCalendar = day.date
  const dateFromSelectedDay = selectedDay

  const isSelected = dateFromCalendar.getDate() === dateFromSelectedDay.getDate()

  return (
    <TouchableOpacity
      onPress={() => handleDayClick(day.date)}
      style={{
        ...styles.day,
        backgroundColor: isSelected ? MAIN_ACCENT_COLOR : APP_WHITE,
        borderColor: isSelected ? MAIN_ACCENT_COLOR : APP_GRAY
      }}
    >
      <Text style={{
        ...styles.dayText, color: isSelected ? APP_WHITE : HABIT_OPTION
      }}>
        {day.day}
      </Text>
      <Text style={{
        ...styles.dayNumber,
        color: isSelected ? APP_WHITE : HABIT_OPTION
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

