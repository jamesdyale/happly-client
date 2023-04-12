import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { WelcomeSVG } from '../../../assets/svgs'
import { SECONDARY_BG_COLOR } from '../../../styles'
import { CustomTextInput } from '../../../components'

export const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.onboardContainer}>
      <View style={styles.onboardContainerLayout}>
        <View style={styles.onboardContainerLayoutHeader}>
          <View style={styles.skipTextContainer}>
            <Text>Skip</Text>
          </View>
          <View style={styles.welcomeIcon}>
            <WelcomeSVG />
          </View>
        </View>

        <View style={styles.welcomeFormContainer}>
          <Text style={styles.welcomeUser}>Hello,</Text>
          <Text style={styles.welcomeInfo}>we would like to know you so we personalize your experience!</Text>
          <View style={styles.welcomeForm}>
            <CustomTextInput label='Name' placeholder='Name' />
            <CustomTextInput label='Email' placeholder='Email' />
            <CustomTextInput label='Password' placeholder='Password' />
            <CustomTextInput label='Confirm Password' placeholder='Confirm Password' />
          </View>
          <View style={styles.welcomeActionBtn}>
            {/* TODO: Add a slider that shows how many more screens for onboarding */}
            <Button title='sliders' onPress={() => console.log('screen 1')} />
            <Button title='Next' onPress={() => console.log('Hey there')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  onboardContainer: {
    backgroundColor: SECONDARY_BG_COLOR
  },
  onboardContainerLayout: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardContainerLayoutHeader: {
    display: 'flex',

    justifyContent: 'space-between',
    marginBottom: 40
  },
  skipTextContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  skipText: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20
  },
  welcomeIcon: {},
  welcomeFormContainer: {
    display: 'flex'
  },
  welcomeUser: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 44,
    color: '#000000'
  },
  welcomeInfo: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#333333'
  },
  welcomeForm: {
    marginTop: 20, marginBottom: 20
  },
  welcomeActionBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})