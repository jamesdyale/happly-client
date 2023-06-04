import { createStackNavigator } from '@react-navigation/stack'
import {
  AddHabit,
  AllChallenges,
  AllHabits,
  CreateChallenge,
  CreateRoom, Home,
  Room,
  Rooms,
  Settings
} from '@screen/index'
import { ROUTES } from '../../constants'
import React from 'react'

const Stack = createStackNavigator()

export const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN_HOME} component={Home} />
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
    </Stack.Navigator>
  )
}

export const HabitsScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.ALL_HABIT} component={AllHabits} />
      <Stack.Screen name={ROUTES.CREATE_HABIT} component={AddHabit} />
    </Stack.Navigator>
  )
}


export const ChallengesScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.ALL_CHALLENGES} component={AllChallenges} />
      <Stack.Screen name={ROUTES.CREATE_CHALLENGE} component={CreateChallenge} />
    </Stack.Navigator>
  )
}

export const RoomsScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.ALL_ROOMS} component={Rooms} />
      <Stack.Screen name={ROUTES.CREATE_ROOM} component={CreateRoom} />
      <Stack.Screen name={ROUTES.SINGLE_ROOM} component={Room} />
    </Stack.Navigator>
  )
}
