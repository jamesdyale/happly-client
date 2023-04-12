import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { WelcomeSVG } from '../../../assets/svgs'
import { APP_WHITE, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../../styles'
import { CustomButton, CustomTextInput } from '../../../components'

type IForm = {
  changeBetweenForms: () => void
}

const LoginForm = ({ changeBetweenForms }: IForm) => (
  <View style={styles.AuthForm}>
    <View style={styles.AuthFormHeaderContainer}>
      <Text style={styles.AuthFormHeader}>Welcome Back ✌️✌️</Text>
      <Text style={styles.AuthFormInfo}>Enter login details to get started.</Text>
      <View style={styles.AuthFormBody}>
        <CustomTextInput label='Email Address' placeholder='Enter Email Address' />
        <CustomTextInput label='Password' placeholder='Enter Password' />
      </View>
    </View>
    <View style={styles.AuthFormActionBtn}>
      <Text style={styles.ActionTextContainer}>
        <Text style={styles.ActionText}>Don't have an account? </Text>
        <Text style={styles.HighlightedText} onPress={() => changeBetweenForms()}>Sign Up</Text>
      </Text>
      <CustomButton bgColor={MAIN_ACCENT_COLOR} color={APP_WHITE} text={'Login'}
                    onClick={() => console.log('hey there')} />
      <View style={styles.ActionTextContainer}>
        <Text style={styles.ActionText}>Forgot Password? </Text>
        <Text style={styles.HighlightedText} onPress={() => console.log('navigate to password recovery')}>Recover
          Password</Text>
      </View>
    </View>
  </View>
)


const SignUpForm = ({ changeBetweenForms }: IForm) => {
  return (
    <View style={styles.AuthForm}>
      <View style={styles.AuthFormHeaderContainer}>
        <Text style={styles.AuthFormHeader}>Create An Account️</Text>
        <Text style={styles.AuthFormInfo}>Provide required details and click the <Text
          style={{ color: MAIN_ACCENT_COLOR }}>Sign Up</Text> button
          below.</Text>
        <View style={styles.AuthFormBody}>
          <CustomTextInput label='Email Address' placeholder='Enter Email Address' />
          <CustomTextInput label='Password' placeholder='Enter Password' />
          <CustomTextInput label='Confirm Password' placeholder='Re-enter password' />
        </View>
      </View>
      <View style={styles.AuthFormActionBtn}>
        <Text style={styles.ActionTextContainer}>
          <Text style={styles.ActionText}>By clicking the "Sign Up" button, you accept the </Text>
          <Text style={styles.HighlightedText} onPress={() => console.log('navigate to terms of use')}>Terms of
            Use</Text>
          <Text style={styles.ActionText}> and </Text>
          <Text style={styles.HighlightedText} onPress={() => console.log('navigate to privacy policy')}>privacy
            policy</Text>
        </Text>
        <CustomButton bgColor={MAIN_ACCENT_COLOR} color={APP_WHITE} text={'Sign Up'}
                      onClick={() => console.log('hey there')} />
        <Text style={styles.ActionTextContainer}>
          <Text style={styles.ActionText}>Already have an account? </Text>
          <Text style={styles.HighlightedText} onPress={() => changeBetweenForms()}>Login</Text>
        </Text>
      </View>
    </View>
  )
}


export const AuthScreen = ({ navigation }) => {

  const [formType, setFormType] = React.useState('register')

  const changeBetweenForms = () => {
    console.log('changeBetweenForms')
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
        <LoginForm changeBetweenForms={changeBetweenForms} />
        : <SignUpForm changeBetweenForms={changeBetweenForms} />}
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