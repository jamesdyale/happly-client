import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider } from 'jotai'
import { NavigationContainer } from '@react-navigation/native'
import { NavigationRoutes } from './navigation'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'


const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_600SemiBold, Inter_500Medium, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }


  return (
    <NavigationContainer>
      <StateProvider>
        <NavigationRoutes />
      </StateProvider>
    </NavigationContainer>
  )
}


registerRootComponent(App)
