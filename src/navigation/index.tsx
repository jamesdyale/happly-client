import { DarkTheme, DefaultTheme, NavigationContainer, NavigationState } from '@react-navigation/native'
import { RootNavigator } from '~navigation/RootNavigator'
import { useNavigationStatePersistence, useScreenTracker } from '~hooks'
import { useCallback } from 'react'
import { useColorScheme } from 'react-native'


export const Navigation = () => {
  const { navigationRef, onReady, onStateChange: onStateChangeScreenTracker } = useScreenTracker()
  const theme = useColorScheme()

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
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
      // linking={linking}
      initialState={initialState}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}
