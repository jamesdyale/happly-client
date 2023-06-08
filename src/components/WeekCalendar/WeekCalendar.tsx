import { View, StyleSheet, Text } from 'react-native'
import { getWeekFromCurrentDate } from '@shared/utils'
import { DayOfTheWeek } from './components/DayOfTheWeek'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK, GRAY_TEXT } from '../../styles'
import moment from 'moment/moment'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { dailyHabitsAtom, selectDayOfTheWeekAtom, userAtom } from '@state/state'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { Habit } from '../../types/Habit'


// make this into a reusable library
export const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useAtom(selectDayOfTheWeekAtom)
  const user = useAtomValue(userAtom)
  const setDailyHabit = useSetAtom(dailyHabitsAtom)


  const week = getWeekFromCurrentDate()
  const day = new Date()

  const handleDayClick = async (day: Date) => {
    setSelectedDay(day)
    // TODO: adding check for the day if it's the same as today
    const docs = await getDocs(query(collection(FIREBASE_DB, 'habits'), where('userId', '==', user.id)))
    const habits: Habit[] = []
    docs.forEach((doc) => {
        const data = doc.data() as Habit
        habits.push(data)
      }
    )
    setDailyHabit(habits)
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
