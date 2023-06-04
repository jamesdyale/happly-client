import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { APP_BLACK } from '../../../../styles'
import { WeekCalendar } from '../../../../components'
import { WeekView } from './components/WeekView'


export const AllHabits = () => {

  const allHabits = [
    {
      id: 1,
      title: 'Drink water',
      description: 'Drink 2 liters of water every day',
      frequency: 'Daily',
      last7days: [true, false, true, false, false, true, true]
    },
    {
      id: 2,
      title: 'Evening workout',
      description: 'Do a 30 minute workout every evening',
      frequency: 'Daily',
      last7days: [true, false, true, false, false, false, false]
    },
    {
      id: 3,
      title: 'Morning workout',
      description: 'Do a 30 minute workout every morning',
      frequency: 'Daily',
      last7days: [true, true, true, true, true, true, true]
    },
    {
      id: 4,
      title: 'Meditate',
      description: 'Meditate for 10 minutes every morning',
      frequency: 'Daily',
      last7days: [false, false, true, false, false, true, false]
    }
  ]

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Habits</Text>
        <View>
          {allHabits.map((habit) => (
            <WeekView habit={habit} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F3F3',
    flex: 1
  },
  container: {
    padding: 20
  },
  headerText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    color: APP_BLACK,
    display: 'flex',
    marginBottom: 20
  }
})
