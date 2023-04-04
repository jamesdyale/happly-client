import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  OnboardContainer
} from '../screen'
import { BottomTabNavigator } from './BottomTabNavigator'
import { CustomModalStackNavigator } from './CustomModalStackNavigator'
import { CustomStackNavigator } from './CustomStackNavigator'


const Stack = createNativeStackNavigator()

export const NavigationRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='MainApp'>
      <Stack.Screen name='MainApp' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='Onboard'>
        {(props) => <OnboardContainer {...props} />}
      </Stack.Screen>
      <Stack.Screen name='CustomModal' component={CustomModalStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='CustomStack' component={CustomStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}