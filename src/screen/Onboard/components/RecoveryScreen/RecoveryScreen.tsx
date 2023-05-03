import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CustomButton, CustomTextInput } from '../../../../components'
import { APP_WHITE, MAIN_ACCENT_COLOR } from '../../../../styles'
import React from 'react'

export const RecoveryScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.AuthForm}>
        <View style={styles.AuthFormHeaderContainer}>
          <Text style={styles.AuthFormHeader}>Recover Password️</Text>
          <Text style={styles.AuthFormInfo}>Kindly enter email address you signed up with.</Text>
          <Text style={styles.AuthFormInfo}>Kindly enter email address you signed up with.</Text>
          <View style={styles.AuthFormBody}>
            <CustomTextInput label='Email Address' placeholder='Enter Email Address' />
          </View>
        </View>
        <View style={styles.AuthFormActionBtn}>
          <CustomButton bgColor={MAIN_ACCENT_COLOR} color={APP_WHITE} text={'Get Reset Link'}
                        onClick={() => console.log('hey there')} />
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