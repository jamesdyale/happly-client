import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '../screen/Home/Home'
import { OnboardContainer } from '../screen/Onboard/OnboardContainer'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home'>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Onboard'>
          {(props) => <OnboardContainer {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}