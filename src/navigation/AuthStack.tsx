import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { AuthScreen, OnboardScreen, RecoveryScreen } from '../screen'

const Stack = createNativeStackNavigator()

export function AuthStack() {
  return (
    <Stack.Group>
      <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
      <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
      <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
    </Stack.Group>
  )
}
