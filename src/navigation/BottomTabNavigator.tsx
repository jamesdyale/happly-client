import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTES } from '~constants'
import { HABIT_OPTION, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '~styles'
import {
  AllHabitsScreenNavigator,
  ChallengesScreenNavigator,
  CreateHabitScreenNavigator,
  HomeScreenNavigator,
  RoomsScreenNavigator
} from './ScreenNavigator'
import { CustomTabItem } from '~components'

const { Navigator, Screen } = createBottomTabNavigator()

export const BottomTabNavigator = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: HABIT_OPTION,
        tabBarStyle: {
          ...styles.tabBarStyle,
          display: route.name === ROUTES.CREATE_HABIT ? 'none' : 'flex'
        },
        tabBarActiveTintColor: MAIN_ACCENT_COLOR,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName
          let tabName

          if (route.name === ROUTES.HOME) {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline'
            tabName = 'Home'
          } else if (route.name === ROUTES.ALL_HABIT) {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
            tabName = 'Habit'
          } else if (route.name === ROUTES.ALL_CHALLENGES) {
            iconName = focused ? 'ios-trophy' : 'ios-trophy-outline'
            tabName = 'Challenge'
          } else if (route.name === ROUTES.ALL_ROOMS) {
            iconName = focused
              ? 'ios-chatbox-ellipses'
              : 'ios-chatbox-ellipses-outline'
            tabName = 'Rooms'
          } else if (route.name === ROUTES.CREATE_HABIT) {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
            tabName = 'Create'
          }

          return (
            <CustomTabItem
              name={tabName}
              icon={iconName}
              size={22}
              color={color}
            />
          )
        }
      })}
    >
      <Screen
        name={ROUTES.HOME}
        component={HomeScreenNavigator}
      />
      <Screen
        name={ROUTES.ALL_HABIT}
        component={AllHabitsScreenNavigator}
      />
      <Screen
        name={ROUTES.CREATE_HABIT}
        component={CreateHabitScreenNavigator}
      />
      <Screen
        name={ROUTES.ALL_CHALLENGES}
        component={ChallengesScreenNavigator}
      />
      <Screen
        name={ROUTES.ALL_ROOMS}
        component={RoomsScreenNavigator}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: SECONDARY_BG_COLOR,
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 90,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 10
  }
})
