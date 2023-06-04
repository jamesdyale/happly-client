import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, useAtomValue } from 'jotai'
import { NavigationContainer } from '@react-navigation/native'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter'
import { ToastProvider } from 'react-native-toast-notifications'
import { ActivityIndicator, View } from 'react-native'
import { AuthStack } from '@navigation/AuthStack'
import { userAtom } from '@state/state'
import { AppStack } from '@navigation/AppStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const App = () => {
  const isLoading = false
  const isLoggedIn = true

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
    <NavigationContainer>
      <StateProvider>
        <ToastProvider placement='top' offsetTop={100}>
          {isLoggedIn ? <AppStack /> : <AuthStack />}
        </ToastProvider>
      </StateProvider>
    </NavigationContainer>
  )
}

registerRootComponent(App)
