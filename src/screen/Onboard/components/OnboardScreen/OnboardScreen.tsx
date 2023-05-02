import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {
  OnboardScreenFourIcon,
  OnboardScreenOneIcon,
  OnboardScreenThreeIcon,
  OnboardScreenTwoIcon
} from '../../../../assets/svgs'
import { MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../../../styles'


const OnboardScreenOne = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenOneIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>A better version of you</Text>
      <Text style={styles.OnboardInformation_Text}>Having trouble sticking to your goals?
        We’ve build an all in one self development
        app to help you stay motivated and inspired
        to stick to your goals!
      </Text>
    </View>
  </>
)

const OnboardScreenTwo = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenTwoIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>Benefits of habits</Text>
      <FlatList
        data={[
          { key: 1, text: 'Almost half of the actions you perform each day are habits' },
          { key: 2, text: 'The right habits can help you reach your goals' },
          { key: 3, text: 'Habits determine the quality of your life' }
        ]}
        renderItem={({ item }) => {
          return (
            <View key={item.key}>
              <Text style={{ ...styles.OnboardInformation_Text }}>{`\u2022 ${item.text}`}</Text>
            </View>
          )
        }}
      />
    </View>
  </>
)

const OnboardScreenThree = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenThreeIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>How do we help you stick to your habits</Text>
      <FlatList
        data={[
          { key: 1, text: 'Easy habit tracking' },
          { key: 2, text: 'Accountability room' },
          { key: 3, text: 'Daily motivation message' },
          { key: 4, text: 'End of day report' }
        ]}
        renderItem={({ item }) => {
          return (
            <View key={item.key}>
              <Text style={{ ...styles.OnboardInformation_Text }}>{`\u2022 ${item.text}`}</Text>
            </View>
          )
        }}
      />
    </View>
  </>
)

const OnboardScreenFour = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenFourIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>Feeling motivated already</Text>
      <Text style={styles.OnboardInformation_Text}>
        “If you get better 1% every day for one year
        you will end up 37 times better by the time
        you are done”
      </Text>
    </View>
  </>
)

export const OnboardScreen = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = React.useState<number>(1)

  const handleSkip = () => {
    navigation.navigate('MainApp')
  }

  const handleNext = () => {
    switch (currentScreen) {
      case 1:
        setCurrentScreen(2)
        break
      case 2:
        setCurrentScreen(3)
        break
      case 3:
        setCurrentScreen(4)
        break
      case 4:
        navigation.navigate('MainApp')
    }
  }

  return (
    <SafeAreaView style={styles.OnboardScreen}>
      <View style={styles.OnboardScreen_Container}>
        <View style={styles.OnboardScreen_SkipTextContainer}>
          <Text style={styles.OnboardScreen_SkipText} onPress={handleSkip}>Skip</Text>
        </View>
        <View style={styles.OnboardScreen_CurrentScreen}>
          {currentScreen === 1 ? <OnboardScreenOne /> : null}
          {currentScreen === 2 ? <OnboardScreenTwo /> : null}
          {currentScreen === 3 ? <OnboardScreenThree /> : null}
          {currentScreen === 4 ? <OnboardScreenFour /> : null}
        </View>
        <View style={styles.OnboardInformation_ActionBtn}>
          {/* TODO: Add a slider that shows how many more screens for onboarding */}
          <Text style={styles.OnboardInformation_ActionBtn_Slider}>Slider goes here</Text>
          <Text style={styles.OnboardInformation_ActionBtn_NextBtn}
                onPress={handleNext}>
            {currentScreen !== 4 ? 'Next' : 'Get Started!'}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  OnboardScreen: {
    backgroundColor: SECONDARY_BG_COLOR
  },
  OnboardScreen_Container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  OnboardScreen_Icon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    height: '50%'
  },
  OnboardScreen_SkipTextContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20,
    height: '5%'
  },
  OnboardScreen_SkipText: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: MAIN_ACCENT_COLOR
  },
  OnboardScreen_CurrentScreen: {
    height: '80%',
    display: 'flex',
    justifyContent: 'space-between'

  },
  OnboardInformation: {},
  OnboardInformation_Title: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 34,
    color: '#000000',
    marginBottom: 20
  },
  OnboardInformation_Text: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: '#333333',
    marginBottom: 20
  },
  OnboardInformation_ActionBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '10%'
  },
  OnboardInformation_ActionBtn_Slider: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: MAIN_ACCENT_COLOR
  },
  OnboardInformation_ActionBtn_NextBtn: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
    color: MAIN_ACCENT_COLOR
  }
})