import { ROUTES } from '../constants'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthScreen, OnboardScreen, RecoveryScreen } from '../screen'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Onboard' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
      <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
      <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
    </Stack.Navigator>
  )
}
