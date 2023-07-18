import React, { useEffect, useRef, useState } from 'react'
import { Provider as StateProvider } from 'jotai'
import { ToastProvider } from 'react-native-toast-notifications'
import { Navigation } from '~navigation'
import { AppLoading } from '~AppLoading'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { storeData } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})


async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  // save this token in some DB
  return token
}

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      storeData(ASYNC_STORAGE_KEYS.PUSH_TOKEN, token).then(() => {
        console.log('saved push token')
      })
    })
  })

  console.log('push token', expoPushToken)

  // TODO: Bring in NativeBaseProvider for light mode dark mode - https://github.com/kacgrzes/expo-typescript-template/blob/981dc18e5a7df5ec3b9be0fd847cd6e0a01e4da2/src/index.tsx#L32
  return (
    <StateProvider>
      <ToastProvider placement='top' offsetTop={120} offsetBottom={120}>
        <AppLoading>
          <Navigation />
        </AppLoading>
      </ToastProvider>
    </StateProvider>
  )
}

export default App
