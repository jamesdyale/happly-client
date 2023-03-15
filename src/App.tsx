import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, atom } from 'jotai'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigator } from './navigation'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'


export const textAtom = atom('hello')

const Tab = createBottomTabNavigator()

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
        <BottomTabNavigator />
      </StateProvider>
    </NavigationContainer>
  )
}


registerRootComponent(App)
