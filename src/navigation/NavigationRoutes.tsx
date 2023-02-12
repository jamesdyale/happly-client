import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  OnboardContainer
} from '../screen'
import { ROUTES } from '../constants'


const Stack = createNativeStackNavigator()

export const NavigationRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.HOME}>
      <Stack.Screen name='Onboard'>
        {(props) => <OnboardContainer {...props} />}
      </Stack.Screen>


    </Stack.Navigator>
  )
}