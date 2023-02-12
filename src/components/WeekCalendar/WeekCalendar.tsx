import { View, Text, StyleSheet } from 'react-native'
import { getWeekFromCurrentDate } from '../../shared/utils'
import moment from 'moment'


// make this into a reusable library
export const WeekCalendar = () => {
  const week = getWeekFromCurrentDate()
  console.log('week', week)
  return (
    <View style={styles.container}>
      {week.map((day) => {
        return (
          <View style={{ ...styles.day, backgroundColor: day.isToday ? 'red' : 'white' }}>
            <Text>{day.day}</Text>
            <Text>{moment(day.date).format('DD')}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10
  },
  day: {
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10

  }
})
