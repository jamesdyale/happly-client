import { View, StyleSheet } from 'react-native'
import { getWeekFromCurrentDate } from '../../shared/utils'
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { DayOfTheWeek } from './components/DayOfTheWeek'


// make this into a reusable library
export const WeekCalendar = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  const week = getWeekFromCurrentDate()

  return (
    <View style={styles.container}>
      {week.map((day) => {
        return (
          <DayOfTheWeek key={day.day} day={day} />
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
  }
})
