import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, atom } from 'jotai'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabNavigator } from './navigation'


export const textAtom = atom('hello')

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StateProvider>
        <BottomTabNavigator />
      </StateProvider>
    </NavigationContainer>
  )
}


registerRootComponent(App)
