import { ROUTES } from '~constants'
import { CreateHabitScreen, HabitScreen, HabitsScreen } from '~screens'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export const HabitStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={ROUTES.ALL_HABIT} component={HabitsScreen} />
      <Screen name={ROUTES.SINGLE_HABIT} component={HabitScreen} />
      <Screen name={ROUTES.CREATE_HABIT} component={CreateHabitScreen} />
    </Navigator>
  )
}
