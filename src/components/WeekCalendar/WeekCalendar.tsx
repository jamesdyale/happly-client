import { View, StyleSheet, Text } from 'react-native'
import { getWeekFromCurrentDate } from '@shared/utils'
import { DayOfTheWeek } from './components/DayOfTheWeek'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK, GRAY_TEXT } from '../../styles'
import moment from 'moment/moment'
import { useAtom } from 'jotai'
import { selectedDayOfTheWeekAtom } from '@state/state'
import { ROUTES } from '../../constants'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


// make this into a reusable library
export const WeekCalendar = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [selectedDay, setSelectedDay] = useAtom(selectedDayOfTheWeekAtom)

  const week = getWeekFromCurrentDate()
  const day = new Date()


  const handleDayClick = async (day: Date) => {
    setSelectedDay(day)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{moment(day).format('Do MMMM YYYY')}</Text>
        <Icon name='calendar-outline' size={25} color={APP_BLACK}
              onPress={() => navigate(ROUTES.ALL_HABIT)}
        />
      </View>
      <View style={styles.footer}>
        {week.map((day) => {
          return (
            <DayOfTheWeek
              key={day.date.toString()}
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
    color: GRAY_TEXT
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
