import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { BottomTabNavigator } from './BottomTabNavigator'
import { CustomModalStackNavigator } from './CustomModalStackNavigator'
import { CustomStackNavigator } from './CustomStackNavigator'
import { HabitsScreenNavigator } from './ScreenNavigator'
import { ROUTES } from '../constants'


const Stack = createNativeStackNavigator()

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='MainApp' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
      <Stack.Screen name={ROUTES.HABIT} component={HabitsScreenNavigator} />
      <Stack.Screen name={ROUTES.CUSTOM_MODAL} component={CustomModalStackNavigator} />
      <Stack.Screen name={ROUTES.CUSTOM_STACK} component={CustomStackNavigator} />
    </Stack.Navigator>
  )
}
