import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '~data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc } from 'firebase/firestore'
import { User } from '~types'
import { useAtom, useSetAtom } from 'jotai'
import { authFlowAtom, isAppReadyAtom, userAtom } from '~state'

export const useAuth = () => {
  const setUser = useSetAtom(userAtom)
  const [, setAuthFlow] = useAtom(authFlowAtom)
  const [isAppReady, setIsAppReady] = useAtom(isAppReadyAtom)

  useEffect(() => {
    let isMounted = true

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

    if (isMounted) {
      console.log('is app ready')
      setIsAppReady(true)
    }

    return () => {
      isMounted = false
    }
  }, [])

  return isAppReady
}
