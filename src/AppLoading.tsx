import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useAuth, useCachedResources } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const { isUserOnboarded, isAppReady } = useAuth()


  useEffect(() => {
    if (isLoadingComplete && isAppReady) {
      SplashScreen.hideAsync()
    }
  }, [isLoadingComplete, isAppReady, isUserOnboarded])

  if (!isLoadingComplete || !isAppReady) {
    return null
  }

  return <>{children}</>
}
