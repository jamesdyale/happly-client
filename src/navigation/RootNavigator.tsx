import { ROUTES } from '../constants'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAtom, useAtomValue } from 'jotai'
import { doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authFlowAtom, isAppReadyAtom, userAtom } from '~state'
import { FIREBASE_AUTH, FIREBASE_DB } from '~data'
import { User } from '~types'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardScreen, AccountRecoveryScreen, HabitScreen, HabitsScreen } from '~screens'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import { LoginScreen } from '~screens/LoginScreen'
import { SignUpScreen } from '~screens/SignUpScreen'
import { ModalStack } from '~navigation/ModalStack'

const { Navigator, Screen, Group } = createStackNavigator()
// TODO: Add TypeScript Support to Navigator - const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()


export const RootNavigator = () => {
  const [isAppReady, setIsAppReady] = useAtom(isAppReadyAtom)

  const [user, setUser] = useAtom(userAtom)
  const [, setAuthFlow] = useAtom(authFlowAtom)
  const [onboarded, setOnboarded] = useState()

  // const setPushToken = useSetAtom(pushTokenAtom)
  // const [notification, setNotification] = useState<Notifications.Notification>()
  // const notificationListener = useRef()
  // const responseListener = useRef()

  // TODO - add a loader to hide the screen until the user is loaded

  // — — — — — — — — — — EFFECTS — — — — — — — — — — //
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      const userId = await AsyncStorage.getItem('userId')
      // check if token is valid and refresh the token
      if (user) {
        const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', user.uid))
        if (dataDocumentSnapshot.exists()) {
          setUser(dataDocumentSnapshot.data() as User)
        }
        // TODO: add error handling here
      } else {
        if (userId) {
          const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', userId))
          if (dataDocumentSnapshot.exists()) {
            setUser(dataDocumentSnapshot.data() as User)
          }
        } else {
          setUser(null)
          setAuthFlow('register')
        }
      }
    })
  }, [])


  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      getStorage()
    }

    return () => {
      isMounted = false
    }

  }, [])

  useEffect(() => {
    // readyApp()
  }, [])

// — — — — — — — — — — ACTIONS — — — — — — — — — — //
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED')
    setOnboarded(JSON.parse(onboarded))
  }


  // const onLayoutRootView = useCallback(async () => {
  //   if (ready) {
  //     console.log('Hide the splash screen immediately')
  //     await SplashScreen.hideAsync();
  //   }
  // }, [ready]);
  //
  // if () {
  //
  // }

  if (!isAppReady) {
    return null
  }

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Group key='unauthorized'>
          <Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
          <Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
          <Screen name={ROUTES.RECOVER_ACCOUNT} component={AccountRecoveryScreen} />
        </Group>
      ) : (
        <Group key='authorized'>
          <Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
          <Screen name={ROUTES.ALL_HABIT} component={HabitsScreen} />
          <Screen name={ROUTES.HABIT} component={HabitScreen} />
        </Group>
      )}
      <Group key='modals' screenOptions={{ presentation: 'modal' }}>
        <Screen name={ROUTES.MODAL} component={ModalStack} />
      </Group>
    </Navigator>
  )
}
