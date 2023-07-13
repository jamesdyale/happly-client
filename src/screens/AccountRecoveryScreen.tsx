import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CustomButton, CustomTextInput } from '~components'
import React, { useState } from 'react'
import { APP_WHITE, MAIN_ACCENT_COLOR } from '~styles'
import { useTheme } from '~hooks'

export const AccountRecoveryScreen = () => {
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  return (
    <SafeAreaView>
      <View style={styles.AuthForm}>
        <View style={styles.AuthFormHeaderContainer}>
          <Text style={styles.AuthFormHeader}>Recover Password️</Text>
          <Text style={[styles.AuthFormInfo, {
            color: '#959595'
          }]}>Kindly enter email address you signed up with.</Text>
          <View style={styles.AuthFormBody}>
            <CustomTextInput
              label='Email Address'
              placeholder='Enter Email Address'
              handleChange={() => console.log('hey there')}
              handleBlur={() => console.log('blur')}
              value={''}
            />
          </View>
        </View>
        <View style={styles.AuthFormActionBtn}>
          <CustomButton
            bgColor={theme.MAIN_ACCENT_COLOR}
            color={theme.CONTRAST_MAIN_TEXT_COLOR}
            text='Get Reset Link'
            onClick={() => console.log('hey there')}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
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
    lineHeight: 19
  },
  AuthFormBody: {
    marginTop: 40
  },
  AuthFormActionBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  ActionTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 20
  }
})
