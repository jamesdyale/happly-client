import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { BottomTabNavigator } from '@navigation/components/BottomTabNavigator'
import { CustomModalStackNavigator } from '@navigation/components/CustomModalStackNavigator'
import { CustomStackNavigator } from '@navigation/components/CustomStackNavigator'
import { authFlowAtom, userAtom } from '@state/state'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@data/firebaseConfig'
import { useAtom } from 'jotai'
import { AuthScreen } from '@screen/Auth/components/AuthScreen/AuthScreen'
import { OnboardScreen, RecoveryScreen } from '@screen/Onboard'
import { getDoc, doc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@data/types'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  const [user, setUser] = useAtom(userAtom)
  const [, setAuthFlow] = useAtom(authFlowAtom)
  const [onboarded, setOnboarded] = useState()

  // TODO - add a loader to hide the screen until the user is loaded

  // — — — — — — — — — — EFFECTS — — — — — — — — — — //
  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      const unsubscribe =
        onAuthStateChanged(FIREBASE_AUTH, async (user) => {
          if (user) {
            const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', user.uid))
            if (dataDocumentSnapshot.exists()) {
              setUser(dataDocumentSnapshot.data() as User)
            }
            // TODO: add error handling here
          } else {
            setUser(null)
            setAuthFlow('register')
          }
        })

      return unsubscribe
    }

    return () => {
      isMounted = false
    }
  }, [])


  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      getStorage()
    }

    return () => {
      isMounted = false
    }

  }, [])


// — — — — — — — — — — ACTIONS — — — — — — — — — — //
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED')
    setOnboarded(JSON.parse(onboarded))
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? ROUTES.MAIN_APP : onboarded ? ROUTES.AUTH : ROUTES.BENEFIT}
                       screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name={ROUTES.MAIN_APP} component={BottomTabNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_MODAL} component={CustomModalStackNavigator} />
            <Stack.Screen name={ROUTES.CUSTOM_STACK} component={CustomStackNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
            <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
            <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
