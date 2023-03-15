import { View, StyleSheet, Text } from 'react-native'
import { getWeekFromCurrentDate } from '../../shared/utils'
import { DayOfTheWeek } from './components/DayOfTheWeek'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK } from '../../styles'
import moment from 'moment/moment'
import { useAtom } from 'jotai'
import { selectDayOfTheWeekAtom } from '../../state/state'


// make this into a reusable library
export const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useAtom(selectDayOfTheWeekAtom)


  const week = getWeekFromCurrentDate()
  const day = new Date()

  const handleDayClick = (day: Date) => {
    setSelectedDay(day)
    // TODO: make api call to get habits for the day
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{moment(day).format('Do MMMM YYYY')}</Text>
        <Icon name='calendar-outline' size={25} color={APP_BLACK} />
      </View>
      <View style={styles.footer}>
        {week.map((day) => {
          return (
            <DayOfTheWeek
              day={day}
              selectedDay={selectedDay}
              handleDayClick={handleDayClick}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  headerText: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#333333'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
