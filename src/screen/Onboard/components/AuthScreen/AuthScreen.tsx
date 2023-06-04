import React, { useEffect } from 'react'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { SafeAreaView, StyleSheet } from 'react-native'
import { SECONDARY_BG_COLOR } from '@styles/colors'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '@db/firebaseConfig'
import { ROUTES } from '../../../../constants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export function AuthScreen() {
  const [formType, setFormType] = React.useState('login')

  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log('user logged in')
        // navigate(ROUTES.MAIN_APP, { screen: ROUTES.HOME })
        navigate('MainApp', { screen: 'Home' })
      } else {
        console.log('user logged out')
      }
    })

    return unsubscribe
  }, [])

  const changeBetweenForms = () => {
    if (formType === 'login') {
      setFormType('register')
    }
    if (formType === 'register') {
      setFormType('login')
    }
  }

  return (
    <SafeAreaView style={styles.AuthScreenContainer}>
      {formType === 'login' ?
        <LoginForm changeBetweenForms={changeBetweenForms} /> :
        <SignUpForm changeBetweenForms={changeBetweenForms} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AuthScreenContainer: {
    backgroundColor: SECONDARY_BG_COLOR
  }
})
