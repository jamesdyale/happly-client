import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, useAtomValue } from 'jotai'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter'
import { ToastProvider } from 'react-native-toast-notifications'
import { ActivityIndicator, View } from 'react-native'
import { Navigation } from '@navigation/Navigation'
import { loadingAtom } from '@state/state'

const App = () => {
  const isLoading = useAtomValue(loadingAtom)

  const [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_600SemiBold, Inter_500Medium, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <StateProvider>
      <ToastProvider placement='top' offsetTop={120} offsetBottom={120}>
        <Navigation />
      </ToastProvider>
    </StateProvider>
  )
}

registerRootComponent(App)
