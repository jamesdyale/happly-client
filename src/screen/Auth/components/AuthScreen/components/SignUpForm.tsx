import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { APP_WHITE, MAIN_ACCENT_COLOR } from '@styles/colors'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { CustomButton } from '@components/CustomButton/CustomButton'
import { CustomTextInput } from '@components/CustomTextInput/CustomTextInput'
import { FIREBASE_AUTH } from '@data/firebaseConfig'
import { generateUserId } from '../../../../../generators/generateId'
import { useSetAtom } from 'jotai'
import { userAtom } from '@state/state'
import { useToast } from 'react-native-toast-notifications'
import { ActionCreateUser } from '@actions/index'
import { User } from '@data/types'
import Icon from 'react-native-vector-icons/Ionicons'
import * as WebBrowser from 'expo-web-browser'

type IForm = {
  changeBetweenForms: () => void
}

export const SignUpForm = ({ changeBetweenForms }: IForm) => {
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const setUser = useSetAtom(userAtom)


  const handleSignUp = async () => {
    setLoading(true)

    if (password !== confirmPassword) {
      toast.show('Passwords do not match', {
        type: 'danger',
        duration: 4000,
        placement: 'bottom',
        icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
      })
      setLoading(false)
      return
    }

    try {
      const userCredentialPromise = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      if (userCredentialPromise && userCredentialPromise.user) {
        const data: User = {
          id: generateUserId(),
          email: userCredentialPromise.user.email,
          name: userCredentialPromise.user.displayName
        }
        await ActionCreateUser(data, userCredentialPromise.user.uid)
        setUser(data)
      }
    } catch (error) {
      toast.show('Sign up failed. Please try again!', {
        type: 'danger',
        duration: 4000,
        placement: 'bottom',
        icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.AuthForm}>
      <View style={styles.AuthFormHeaderContainer}>
        <Text style={styles.AuthFormHeader}>Create An Account️</Text>
        <Text style={styles.AuthFormInfo}>Provide required details and click the <Text
          style={{ color: MAIN_ACCENT_COLOR }}>Sign Up</Text> button
          below.</Text>
        <View style={styles.AuthFormBody}>
          <CustomTextInput
            label='Email Address'
            placeholder='Enter Email Address'
            handleChange={setEmail}
            handleBlur={() => console.log('blur')}
            value={email}
          />
          <CustomTextInput
            label='Password'
            placeholder='Enter Password'
            handleChange={setPassword}
            handleBlur={() => console.log('blur')}
            value={password}
            secureTextEntry={true}
          />
          <CustomTextInput
            label='Confirm password'
            placeholder='Re-enter Password'
            handleChange={setConfirmPassword}
            handleBlur={() => console.log('blur')}
            value={confirmPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.AuthFormActionBtn}>
        <Text style={styles.ActionTextContainer}>
          <Text style={styles.ActionText}>By clicking the "Sign Up" button, you accept the </Text>
          <Text style={styles.HighlightedText}
                onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/terms_and_conditions')}>Terms
            and Conditions
          </Text>
          <Text style={styles.ActionText}> and </Text>
          <Text style={styles.HighlightedText}
                onPress={() => WebBrowser.openBrowserAsync('https://jamesodeyale.github.io/happly-docs/privacy')}>privacy
            policy</Text>
        </Text>
        <CustomButton
          bgColor={MAIN_ACCENT_COLOR}
          color={APP_WHITE}
          text='Sign Up'
          onClick={handleSignUp}
          disabled={loading}
        />
        <Text style={styles.ActionTextContainer}>
          <Text style={styles.ActionText}>Already have an account? </Text>
          <Text style={styles.HighlightedText} onPress={changeBetweenForms}>Login</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
