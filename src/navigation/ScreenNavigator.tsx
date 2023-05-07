import { createStackNavigator } from '@react-navigation/stack'
import {
  AddHabit,
  AllChallenges,
  AllHabits,
  CreateChallenge,
  CreateRoom,
  Home,
  Room,
  Rooms,
  Settings,
  SingleHabit
} from '../screen'
import { ROUTES } from '../constants'
import React from 'react'

const Stack = createStackNavigator()

export const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={ROUTES.HOME}>
        {(props) => <Home {...props} />}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.SETTINGS}>
        {(props) => <Settings {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export const HabitsScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.ALL_HABIT}>
        {(props) => <AllHabits {...props} />}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.CREATE_HABIT}>
        {(props) => <AddHabit {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}


export const ChallengesScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.ALL_CHALLENGES}>
        {(props) => <AllChallenges {...props} />}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.CREATE_CHALLENGE}>
        {(props) => <CreateChallenge {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export const RoomsScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.ALL_ROOMS}>
        {(props) => <Rooms {...props} />}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.CREATE_ROOM}>
        {(props) => <CreateRoom {...props} />}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.SINGLE_ROOM}>
        {(props) => <Room {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}