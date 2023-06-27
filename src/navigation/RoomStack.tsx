import { ROUTES } from '~constants'
import { CreateRoomScreen, RoomScreen, RoomsScreen } from '~screens'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export const RoomStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={ROUTES.ALL_ROOMS} component={RoomsScreen} />
      <Screen name={ROUTES.CREATE_ROOM} component={CreateRoomScreen} />
      <Screen name={ROUTES.SINGLE_ROOM} component={RoomScreen} />
    </Navigator>
  )
}
