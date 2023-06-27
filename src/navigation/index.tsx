import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { RootNavigator } from '~navigation/RootNavigator'

// import { linking } from './linking'

// import {
//   useScreenTracker,
//   useNavigationStatePersistence,
//   useNavigationTheme,
//   useCallback
// } from '~hooks'

export const Navigation = () => {
  // const { navigationRef, onReady, onStateChange: onStateChangeScreenTracker } = useScreenTracker()
  // const { navigationTheme } = useNavigationTheme()

  // const {
  //   isReady,
  //   initialState,
  //   onStateChange: onStateChangeNavigationStatePersistance
  // } = useNavigationStatePersistence()

  // const onStateChange = useCallback(
  //   (state: NavigationState | undefined) => {
  //     onStateChangeScreenTracker()
  //     onStateChangeNavigationStatePersistance(state)
  //   },
  //   [onStateChangeNavigationStatePersistance, onStateChangeScreenTracker]
  // )
  //
  // if (!isReady) {
  //   return null
  // }

  return (
    <NavigationContainer
      // ref={navigationRef}
      // onReady={onReady}
      // onStateChange={onStateChange}
      // theme={navigationTheme}
      // linking={linking}
      // initialState={initialState}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}
