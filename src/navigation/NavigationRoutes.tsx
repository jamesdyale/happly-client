import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { BottomTabNavigator } from './BottomTabNavigator'
import { CustomModalStackNavigator } from './CustomModalStackNavigator'
import { CustomStackNavigator } from './CustomStackNavigator'
import { OnboardNavigator } from './OnboardNavigator'
import { HabitsScreenNavigator } from './ScreenNavigator'


const Stack = createNativeStackNavigator()

export const NavigationRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='Habit' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MainApp' component={BottomTabNavigator} />
      <Stack.Screen name='Onboard' component={OnboardNavigator} />
      <Stack.Screen name='Habit' component={HabitsScreenNavigator} />
      <Stack.Screen name='CustomModal' component={CustomModalStackNavigator} />
      <Stack.Screen name='CustomStack' component={CustomStackNavigator} />
    </Stack.Navigator>
  )
}