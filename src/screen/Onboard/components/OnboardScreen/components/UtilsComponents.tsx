import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { GRAY_TEXT, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../../../../styles'
import {
  OnboardScreenFourIcon,
  OnboardScreenOneIcon,
  OnboardScreenThreeIcon,
  OnboardScreenTwoIcon
} from '../../../../../assets/svgs'


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
    color: GRAY_TEXT,
    marginBottom: 20
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
