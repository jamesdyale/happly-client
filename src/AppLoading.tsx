import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { useAuth, useCachedResources } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const isSignInComplete = useAuth()


  useEffect(() => {
    if (isLoadingComplete && isSignInComplete) {
      SplashScreen.hideAsync()
    }
  }, [isLoadingComplete, isSignInComplete])

  if (!isLoadingComplete || !isSignInComplete) {
    return null
  }

  return <>{children}</>
}
