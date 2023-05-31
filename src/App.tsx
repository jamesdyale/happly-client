import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, useAtomValue } from 'jotai'
import { NavigationContainer } from '@react-navigation/native'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { ToastProvider } from 'react-native-toast-notifications'
import { AuthStack } from './navigation/AuthStack'
import { AppStack } from './navigation/AppStack'
import { userAtom } from './state/state'

const App = () => {
  const userAtomValue = useAtomValue(userAtom)
  console.log(userAtomValue)
  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_600SemiBold, Inter_500Medium, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }


  return (
    <NavigationContainer>
      <StateProvider>
        <ToastProvider placement='top' offsetTop={100}>
          {userAtomValue !== null ? <AppStack /> : <AuthStack />}
        </ToastProvider>
      </StateProvider>
    </NavigationContainer>
  )
}


registerRootComponent(App)
