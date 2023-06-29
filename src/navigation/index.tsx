import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { RootNavigator } from '~navigation/RootNavigator'
import * as SplashScreen from 'expo-splash-screen'
import { useNavigationStatePersistence, useScreenTracker } from '~hooks'
import { useCallback } from 'react'


export const Navigation = () => {
  const { navigationRef, onReady, onStateChange: onStateChangeScreenTracker } = useScreenTracker()

  const {
    isReady,
    initialState,
    onStateChange: onStateChangeNavigationStatePersistance
  } = useNavigationStatePersistence()


  const onStateChange = useCallback(
    (state: NavigationState | undefined) => {
      onStateChangeScreenTracker()
      onStateChangeNavigationStatePersistance(state)
    },
    [onStateChangeNavigationStatePersistance, onStateChangeScreenTracker]
  )


  if (!isReady) {
    return null
  }

  return (
    <NavigationContainer
      onReady={onReady}
      ref={navigationRef}
      onStateChange={onStateChange}
      // theme={navigationTheme}
      // linking={linking}
      initialState={initialState}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}
