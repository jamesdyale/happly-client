import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider as StateProvider, atom } from 'jotai'
import { Navigation } from './navigation/Navigation'


export const textAtom = atom('hello')


const App = () => {
  return (
    <StateProvider>
      <Navigation />
    </StateProvider>
  )
}


registerRootComponent(App)
