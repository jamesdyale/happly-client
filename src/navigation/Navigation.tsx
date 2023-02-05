import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { OnboardContainer } from '../screen/Onboard'
import { Home } from '../screen/Home'
import { CreateRoom, Room, Rooms } from '../screen/Accountability'
import { AllChallenges, CreateChallenge } from '../screen/Challenge'
import { SingleHabit } from '../screen/Habit/components/SingleHabit/SingleHabit'
import { AllHabits } from '../screen/Habit/components/AllHabits/AllHabits'
import { Settings } from '../screen/Settings'


const Stack = createNativeStackNavigator()

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Onboard'>
          {(props) => <OnboardContainer {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Home'>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name='AllHabit'>
          {(props) => <AllHabits {...props} />}
        </Stack.Screen>
        <Stack.Screen name='SingleHabit'>
          {(props) => <SingleHabit {...props} />}
        </Stack.Screen>
        <Stack.Screen name='Settings'>
          {(props) => <Settings {...props} />}
        </Stack.Screen>
        <Stack.Screen name='AllRooms'>
          {(props) => <Rooms {...props} />}
        </Stack.Screen>
        <Stack.Screen name='CreateRoom'>
          {(props) => <CreateRoom {...props} />}
        </Stack.Screen>
        <Stack.Screen name='SingleRoom'>
          {(props) => <Room {...props} />}
        </Stack.Screen>
        <Stack.Screen name='AllChallenges'>
          {(props) => <AllChallenges {...props} />}
        </Stack.Screen>
        <Stack.Screen name='CreateChallenge'>
          {(props) => <CreateChallenge {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}