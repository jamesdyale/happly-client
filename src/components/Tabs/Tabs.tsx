import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { APP_WHITE } from '../../styles'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { AddHabit, AllChallenges, AllHabits, Home, Rooms } from '../../screen'


const Tab = createBottomTabNavigator()


export const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Habit' component={AllHabits} />
      <Tab.Screen name='AddHabit' component={AddHabit} />
      <Tab.Screen name='Challenge' component={AllChallenges} />
      <Tab.Screen name='Accountability' component={Rooms} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  navbar_container: {

    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    height: 107,
    width: '100%',
    padding: 30
  },
  navbar_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  navbar_item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  }
})