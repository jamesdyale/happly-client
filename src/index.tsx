import React from 'react'
import { Provider as StateProvider, useAtomValue } from 'jotai'
import { ToastProvider } from 'react-native-toast-notifications'
import { Navigation } from '~navigation'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { isAppReadyAtom } from '~state'


const App = () => {
  const isAppReady = useAtomValue(isAppReadyAtom)

  const [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_600SemiBold, Inter_500Medium, Inter_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  // TODO: Bring in NativeBaseProvider for light mode dark mode - https://github.com/kacgrzes/expo-typescript-template/blob/981dc18e5a7df5ec3b9be0fd847cd6e0a01e4da2/src/index.tsx#L32
  return (
    <StateProvider>
      <ToastProvider placement='top' offsetTop={120} offsetBottom={120}>
        <Navigation />
      </ToastProvider>
    </StateProvider>
  )
}

export default App
