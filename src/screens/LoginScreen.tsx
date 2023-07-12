import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CustomButton, CustomTextInput } from '~components'
import { APP_WHITE, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '~styles'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '~data'
import { useSetAtom } from 'jotai'
import { userAtom } from '~state'
import { User } from '~types'
import { ActionGetUserByUID } from '~actions'
import Icon from 'react-native-vector-icons/Ionicons'
import { useToast } from 'react-native-toast-notifications'
import { formValidationOnBlur } from '~utils'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ROUTES } from '~constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setToken } from '~services'

type IForm = {
  changeBetweenForms: () => void
}

export const LoginScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [loading, setLoading] = useState(false)

  const setUser = useSetAtom(userAtom)


  const validateForm = () => {
    let valid = true
    if (password === '') {
      setPasswordError('Please enter your password')
      setLoading(false)
      valid = false
    }

    if (email === '') {
      setEmailError('Please enter your email address')
      setLoading(false)
      valid = false
    }

    return valid
  }

  const handleLogin = async () => {
    setLoading(true)

    const isFormValid = validateForm()

    if (isFormValid) {
      try {
        const foundUserPromise = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        if (foundUserPromise && foundUserPromise.user) {
          const dataDocumentSnapshot = await ActionGetUserByUID(foundUserPromise.user.uid)
          if (dataDocumentSnapshot.exists()) {
            const data = dataDocumentSnapshot.data() as User
            if (data) {
              // const newUser = {
              //   id: data.id,
              //   email: data.email,
              //   name: data.name
              // }
              const token = await foundUserPromise.user.getIdToken()
              await setToken(token)
              await AsyncStorage.setItem('USERID', foundUserPromise.user.uid)
            }
          } else {
            toast.show('\'Your account doesn\'t exist. Please sign up\'', {
              type: 'danger',
              duration: 4000,
              placement: 'bottom',
              icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
            })

          }
        }
      } catch (error) {
        toast.show('Login failed. Please try again!', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
        })

      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={styles.AuthScreenContainer}>
      <KeyboardAvoidingView behavior='padding' style={styles.AuthForm}>
        <View
          style={styles.AuthFormHeaderContainer}>
          <Text style={styles.AuthFormHeader}>Welcome Back ✌️</Text>
          <Text style={styles.AuthFormInfo}>Enter login details to get started.</Text>
          <View style={styles.AuthFormBody}>
            <CustomTextInput
              label='Email Address'
              placeholder='Enter Email Address'
              handleChange={setEmail}
              handleBlur={() => setEmailError(formValidationOnBlur('email', email))}
              value={email}
              error={emailError}
            />
            <CustomTextInput
              label='Password'
              placeholder='Enter Password'
              handleChange={setPassword}
              handleBlur={() => setPasswordError(formValidationOnBlur('password', password))}
              value={password}
              secureTextEntry={true}
              error={passwordError}
            />
          </View>
        </View>
        <View style={styles.AuthFormActionBtn}>
          <Text style={styles.ActionTextContainer}>
            <Text style={styles.ActionText}>Don't have an account? </Text>
            <Text style={styles.HighlightedText} onPress={() => navigate(ROUTES.SIGNUP)}>Sign Up</Text>
          </Text>
          <CustomButton
            bgColor={MAIN_ACCENT_COLOR}
            color={APP_WHITE}
            text='Login'
            onClick={handleLogin}
            disabled={loading}
          />
          <View style={styles.ActionTextContainer}>
            <Text style={styles.ActionText}>Forgot Password? </Text>
            <Text style={styles.HighlightedText} onPress={() => console.log('navigate to password recovery')}>Recover
              Password</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AuthScreenContainer: {
    backgroundColor: SECONDARY_BG_COLOR
  },
  AuthForm: {
    height: '100%',
    paddingTop: 80,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between'
  },
  AuthFormHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  AuthFormHeader: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 12
  },
  AuthFormInfo: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#959595'
  },
  AuthFormBody: {
    marginTop: 40
  },
  AuthFormActionBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  HighlightedText: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.25,
    color: MAIN_ACCENT_COLOR
  },
  ActionTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 20
    // width: '40%',
    // height: '100%'
  },
  ActionText: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.25,
    color: '#686868'
  }
})
