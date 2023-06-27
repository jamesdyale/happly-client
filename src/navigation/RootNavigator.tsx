import { ROUTES } from '../constants'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAtom, useSetAtom } from 'jotai'
import { doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authFlowAtom, userAtom } from '~state'
import { FIREBASE_AUTH, FIREBASE_DB } from '~data'
import { User } from '~types'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardScreen, AccountRecoveryScreen } from '~screens'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import { LoginScreen } from '~screens/LoginScreen'
import { SignUpScreen } from '~screens/SignUpScreen'
import { ModalStack } from '~navigation/ModalStack'
// import * as Notifications from 'expo-notifications'
// import * as Device from 'expo-device'
// import { Platform } from 'react-native'

const { Navigator, Screen, Group } = createStackNavigator()
// TODO: Add TypeScript Support to Navigator - const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false
//   })
// })
//
//
// const registerForPushNotificationsAsync = async () => {
//   let token
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!')
//       return
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data
//     console.log(token)
//   } else {
//     alert('Must use physical device for Push Notifications')
//   }
//
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C'
//     })
//   }
//
//   return token
// }

export const RootNavigator = () => {
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
    let isMounted = true

    if (isMounted) {
      return onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        const a = await AsyncStorage.getItem('user')
        console.log(a)
        if (user) {
          const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', user.uid))
          if (dataDocumentSnapshot.exists()) {
            setUser(dataDocumentSnapshot.data() as User)
          }
          // TODO: add error handling here
        } else {
          setUser(null)
          setAuthFlow('register')
        }
      })
    }

    return () => {
      isMounted = false
    }
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


  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setPushToken(token))
  //
  //   // @ts-ignore
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log('hey there')
  //     console.log(notification)
  //     setNotification(notification)
  //   })
  //
  //   // @ts-ignore
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response)
  //   })
  //
  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current)
  //     Notifications.removeNotificationSubscription(responseListener.current)
  //   }
  // }, [])


// — — — — — — — — — — ACTIONS — — — — — — — — — — //
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED')
    setOnboarded(JSON.parse(onboarded))
  }


  return (
    <Navigator>
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
        </Group>
      )}
      <Group key='modals' screenOptions={{ presentation: 'modal' }}>
        <Screen name={ROUTES.MODAL} component={ModalStack} />
      </Group>
    </Navigator>
  )
}
