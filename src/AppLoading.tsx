import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useAuth, useCachedResources, useColor, useTheme } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const { isUserOnboarded, isAppReady } = useAuth()
  const { isThemeReady } = useTheme()

  useEffect(() => {
    if (isLoadingComplete && isAppReady && isThemeReady) {
      SplashScreen.hideAsync()
    }
  }, [isLoadingComplete, isAppReady, isUserOnboarded, isThemeReady])

  if (!isLoadingComplete || !isAppReady || !isThemeReady) {
    return null
  }

  return <>{children}</>
}
