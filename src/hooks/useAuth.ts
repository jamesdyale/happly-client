import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '~data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc } from 'firebase/firestore'
import { User } from '~types'
import { useAtom, useSetAtom } from 'jotai'
import { authFlowAtom, isAppReadyAtom, isUserOnboardedAtom, userAtom } from '~state'
import { getData, storeData } from '~utils'

export const useAuth = () => {
  const setUser = useSetAtom(userAtom)
  const [, setAuthFlow] = useAtom(authFlowAtom)
  const [isAppReady, setIsAppReady] = useAtom(isAppReadyAtom)
  const [isUserOnboarded, setIsUserOnboarded] = useAtom(isUserOnboardedAtom)

  useEffect(() => {
    let isMounted = true

    async function getOnboardingFromStorage() {
      try {
        const onboarding = await getData('ONBOARDED')
        if (onboarding) {
          setIsUserOnboarded(true)
          const userId = await getData('userId')
          if (userId) {
            onAuthStateChanged(FIREBASE_AUTH, async (user) => {
              const userId = await AsyncStorage.getItem('userId')
              // check if token is valid and refresh the token
              if (user) {
                const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', user.uid))
                if (dataDocumentSnapshot.exists()) {
                  setUser(dataDocumentSnapshot.data() as User)
                }
                // TODO: add error handling here
              } else {
                if (userId) {
                  const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'users', userId))
                  if (dataDocumentSnapshot.exists()) {
                    setUser(dataDocumentSnapshot.data() as User)
                  }
                } else {
                  setUser(null)
                  setAuthFlow('register')
                }
              }
            })
          }
          setAuthFlow('login')
        } else {
          setIsUserOnboarded(false)
          setAuthFlow('register')
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (isMounted) {
      getOnboardingFromStorage().then(() => {
        setIsAppReady(true)
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return { isAppReady, isUserOnboarded }
}
