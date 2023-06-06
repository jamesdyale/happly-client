import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { BottomTabNavigator } from '@navigation/components/BottomTabNavigator'
import { HabitsScreenNavigator } from '@navigation/components/ScreenNavigator'
import { CustomModalStackNavigator } from '@navigation/components/CustomModalStackNavigator'
import { CustomStackNavigator } from '@navigation/components/CustomStackNavigator'
import { userAtom } from '@state/state'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@db/firebaseConfig'
import { useAtom } from 'jotai'
import { AuthScreen } from '@screen/Auth/components/AuthScreen/AuthScreen'
import { OnboardScreen, RecoveryScreen } from '@screen/Onboard'
import { generateUserId } from '../generators/generateId'
import { getDoc, doc } from 'firebase/firestore'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    console.log('useEffect')
    const unsubscribe =
      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        if (user) {
          // const userId = generateUserId()
          // const data = {
          //   id: userId,
          //   email: user.email,
          //   name: user.displayName
          // }
          // console.log('data - ', data)
          // const usersRef = doc(FIREBASE_DB, 'users', userId)
          // const docSnap = await getDoc(usersRef)
          // console.log('docSnap - ', docSnap)
          // setUser(data)

        } else {
          setUser(null)
        }
      })

    return unsubscribe
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.AUTH} screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
            <Stack.Screen name={ROUTES.HABIT} component={HabitsScreenNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_MODAL} component={CustomModalStackNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_STACK} component={CustomStackNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
            <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
            <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
