import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useAuth, useCachedResources, useColor, useTheme } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const { isUserOnboarded, isAppReady } = useAuth()
  const { isThemeReady } = useTheme()

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
