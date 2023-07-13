import { ROUTES } from '../constants'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardScreen, AccountRecoveryScreen, HabitScreen, HabitsScreen } from '~screens'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import { LoginScreen } from '~screens/LoginScreen'
import { SignUpScreen } from '~screens/SignUpScreen'
import { ModalStack } from '~navigation/ModalStack'
import { useAuth } from '~hooks'


const { Navigator, Screen, Group } = createStackNavigator()
// TODO: Add TypeScript Support to Navigator - const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()


export const RootNavigator = () => {
  const { isUserOnboarded, isAppReady } = useAuth()

  return (
    <Navigator screenOptions={{ headerShown: false }}
               initialRouteName={
                 isAppReady && isUserOnboarded ? ROUTES.MAIN_APP : ROUTES.LOGIN
               }>
      {isAppReady && !isUserOnboarded ? (
        <Group key='unauthorized'>
          <Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
        </Group>) : null}

      {isAppReady && isUserOnboarded ? (
        <Group key='authorized'>
          <Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
          <Screen name={ROUTES.ALL_HABIT} component={HabitsScreen} />
          <Screen name={ROUTES.HABIT} component={HabitScreen} />
          <Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
          <Screen name={ROUTES.RECOVER_ACCOUNT} component={AccountRecoveryScreen} />
        </Group>
      ) : null}

      {isAppReady ? (
        <Group key='modals' screenOptions={{ presentation: 'modal' }}>
          <Screen name={ROUTES.MODAL} component={ModalStack} />
        </Group>
      ) : null}
    </Navigator>
  )
}
