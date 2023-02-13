import { View, StyleSheet, Text } from 'react-native'
import { getWeekFromCurrentDate } from '../../shared/utils'
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { DayOfTheWeek } from './components/DayOfTheWeek'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK } from '../../styles'
import moment from 'moment/moment'


// make this into a reusable library
export const WeekCalendar = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_500Medium, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  const week = getWeekFromCurrentDate()
  const day = new Date()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{moment(day).format('Do MMMM YYYY')}</Text>
        <Icon name='calendar-outline' size={25} color={APP_BLACK} />
      </View>
      <View style={styles.footer}>
        {week.map((day) => {
          return (
            <DayOfTheWeek key={day.day} day={day} />
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
    padding: 20
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
