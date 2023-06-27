import { ROUTES } from '~constants'
import { ChallengesScreen, CreateChallengeScreen } from '~screens'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export const ChallengeStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={ROUTES.ALL_CHALLENGES} component={ChallengesScreen} />
      <Screen name={ROUTES.CREATE_CHALLENGE} component={CreateChallengeScreen} />
    </Navigator>
  )
}
