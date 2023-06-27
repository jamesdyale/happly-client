import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { SECONDARY_BG_COLOR } from '@styles/colors'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { useAtom } from 'jotai'
import { authFlowAtom } from '@state/state'

export function AuthScreen() {
  const [authFlow, setAuthFlow] = useAtom(authFlowAtom)


  const changeBetweenForms = () => {
    if (authFlow === 'login') {
      setAuthFlow('register')
    }
    if (authFlow === 'register') {
      setAuthFlow('login')
    }
  }

  return (
    <SafeAreaView style={styles.AuthScreenContainer}>
      {authFlow === 'login' ?
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
