import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { BottomTabNavigator } from '@navigation/components/BottomTabNavigator'
import { CustomModalStackNavigator } from '@navigation/components/CustomModalStackNavigator'
import { CustomStackNavigator } from '@navigation/components/CustomStackNavigator'
import { authFlowAtom, pushTokenAtom, userAtom } from '@state/state'
import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@data/firebaseConfig'
import { useAtom, useSetAtom } from 'jotai'
import { AuthScreen } from '@screen/Auth/components/AuthScreen/AuthScreen'
import { OnboardScreen, RecoveryScreen } from '@screen/Onboard'
import { doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@data/types'
// import * as Notifications from 'expo-notifications'
// import * as Device from 'expo-device'
// import { Platform } from 'react-native'

const Stack = createNativeStackNavigator()

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

export const Navigation = () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? ROUTES.MAIN_APP : onboarded ? ROUTES.AUTH : ROUTES.BENEFIT}
                       screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_MODAL} component={CustomModalStackNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_STACK} component={CustomStackNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
            <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
            <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
