import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { GRAY_TEXT, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '~styles'
import {
  OnboardScreenFiveIcon,
  OnboardScreenTwoIcon,
  OnboardScreenFourIcon,
  OnboardScreenThreeIcon,
  OnboardScreenOneIcon
} from '~assets'

const OnboardScreenOne = () => (
  <>
    <View style={{ ...styles.OnboardScreen_Icon, paddingTop: 50 }}>
      <OnboardScreenOneIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>Welcome to Happly</Text>
      <Text style={styles.OnboardInformation_Text}>Build healthier habits with daily plans and mindful reminders that
        will help you stay accountable.
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
      <Text style={styles.OnboardInformation_Title}>A better version of you</Text>
      <Text style={styles.OnboardInformation_Text}>
        You can build up a new habit or quit an existing bad one with Happly.
      </Text>
    </View>
  </>
)

const OnboardScreenThree = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenThreeIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>Visualize your efforts</Text>
      <Text style={styles.OnboardInformation_Text}>
        We provide you with a daily report of your progress and a weekly analysis of your results.
      </Text>
    </View>
  </>
)

const OnboardScreenFour = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenFourIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>How do we help you stick to your habits</Text>
      <Text style={styles.OnboardInformation_Text}>
        We use a combination of psychology and technology to help you build healthier habits.
      </Text>
    </View>
  </>
)

const OnboardScreenFive = () => (
  <>
    <View style={styles.OnboardScreen_Icon}>
      <OnboardScreenFiveIcon />
    </View>

    <View style={styles.OnboardInformation}>
      <Text style={styles.OnboardInformation_Title}>Feeling motivated already?</Text>
      <Text style={styles.OnboardInformation_Text}>
        “If you get better 1% every day for one year
        you will end up 37 times better by the time
        you are done”
      </Text>
    </View>
  </>
)


export const screens = [
  {
    id: 1,
    component: <OnboardScreenOne />
  },
  {
    id: 2,
    component: <OnboardScreenTwo />
  },
  {
    id: 3,
    component: <OnboardScreenThree />
  },
  {
    id: 4,
    component: <OnboardScreenFour />
  },
  {
    id: 5,
    component: <OnboardScreenFive />
  }
]

export const OnboardItem = ({ item }) => {
  const { width } = useWindowDimensions()
  return (
    <View style={[styles.ItemContainer, { width }]}>
      {item.component}
    </View>
  )
}

export const NextBtn = ({ handleNext, currentScreen }) => {
  return (
    <TouchableOpacity onPress={handleNext}>
      <Text style={styles.OnboardInformation_ActionBtn_NextBtn}>
        {currentScreen < screens.length - 1 ? 'Next' : 'Get Started'}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  ItemContainer: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50
  },
  ItemTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: MAIN_ACCENT_COLOR,
    textAlign: 'center'
  },
  ItemDescription: {
    fontSize: 16,
    color: MAIN_ACCENT_COLOR,
    textAlign: 'center'
  },
  OnboardScreen_Container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  OnboardScreen_Icon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100,
    height: '50%'
  },
  OnboardInformation: {},
  OnboardInformation_Title: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 34,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center'
  },
  OnboardInformation_Text: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    color: GRAY_TEXT,
    marginBottom: 20,
    textAlign: 'center'
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
