import { StyleSheet, Text, View } from 'react-native'
import { CustomButton, CustomTextInput } from '../../../../../components'
import { APP_WHITE, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../../../../styles'
import React from 'react'
import { Formik } from 'formik'

type IForm = {
  changeBetweenForms: () => void
}


export const LoginForm = ({ changeBetweenForms }: IForm) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.AuthForm}>
        <View style={styles.AuthFormHeaderContainer}>
          <Text style={styles.AuthFormHeader}>Welcome Back ✌️✌️</Text>
          <Text style={styles.AuthFormInfo}>Enter login details to get started.</Text>
          <View style={styles.AuthFormBody}>
            <CustomTextInput
              label='Email Address'
              placeholder='Enter Email Address'
              handleChange={handleChange('email')}
              handleBlur={handleBlur('email')}
              value={values.email}
            />
            <CustomTextInput
              label='Password'
              placeholder='Enter Password'
              handleChange={handleChange('password')}
              handleBlur={handleBlur('password')}
              value={values.password}
            />
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
    )}
  </Formik>
)

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
