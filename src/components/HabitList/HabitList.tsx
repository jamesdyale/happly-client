import { View, StyleSheet, Text } from 'react-native'
import { HABIT_OPTION, MAIN_ACCENT_COLOR, MAIN_BG_COLOR } from '../../styles'
import { NoHabitIcon } from '../../assets/svgs/NoHabitIcon'
import { Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { SingleHabit } from './SingleHabit'


export const HabitList = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_600SemiBold
  })

  if (!fontsLoaded) {
    return null
  }


  const habits =
    [
      {
        id: 1,
        name: 'Learn French',
        progress: 0,
        completed: false,
        info: 'Goal: 30min'
      },
      {
        id: 2,
        name: 'Evening Workout',
        progress: 0,
        completed: false,
        info: '8 days streak'
      },
      {
        id: 3,
        name: 'Play Football',
        progress: 0,
        completed: false,
        info: 'Complete today to have your first streak'
      },
      {
        id: 4,
        name: 'Read a book',
        progress: 100,
        completed: true,
        info: '1 day streak'
      },
      {
        id: 5,
        name: 'Morning Cardio',
        progress: 100,
        completed: true,
        info: '5 days streak'
      }
    ]

  return (
    <View style={styles.container}>
      {habits.length === 0 && (
        <View style={styles.noHabitIconContainer}>
          <View
            style={{ marginTop: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NoHabitIcon />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.noHabitMessage}>“The most important
                step of all is the first step” </Text>
              <Text style={styles.noHabitMessageMessenger}>– Blake Mycoskie</Text>
            </View>
          </View>
        </View>)}

      {habits.length > 0 && habits.map((habit) => (
          <SingleHabit habit={habit} />
        )
      )}

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    backgroundColor: MAIN_BG_COLOR
  },
  noHabitIconContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  noHabitMessage: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: HABIT_OPTION,
    opacity: 0.5
  },
  noHabitMessageMessenger: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    color: MAIN_ACCENT_COLOR,
    opacity: 0.5,
    marginTop: 10
  }
})