import { WeeklyCalendarDateType } from '../../../shared'
import { StyleSheet, Text, View } from 'react-native'
import { APP_GRAY, APP_WHITE, HABIT_OPTION, MAIN_ACCENT_COLOR } from '../../../styles'
import moment from 'moment/moment'

interface IDayOfTheWeek {
  key: string,
  day: WeeklyCalendarDateType
}

export const DayOfTheWeek = (props: IDayOfTheWeek) => {
  const { key, day } = props
  return (
    <View key={key} style={{
      ...styles.day, backgroundColor: day.isToday ? MAIN_ACCENT_COLOR : APP_WHITE,
      borderColor: day.isToday ? MAIN_ACCENT_COLOR : APP_GRAY
    }}>
      <Text style={{ ...styles.dayText, color: day.isToday ? APP_WHITE : HABIT_OPTION }}>{day.day}</Text>
      <Text style={{
        ...styles.dayNumber,
        color: day.isToday ? APP_WHITE : HABIT_OPTION
      }}>{moment(day.date).format('DD')}</Text>
    </View>

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

