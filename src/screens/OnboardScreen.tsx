import React from 'react'
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '~styles'
import { CustomSlider } from '~components'
import { NextBtn, OnboardItem, screens, storeData, randomNameGenerator } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'
import { useSetAtom } from 'jotai'
import { isUserOnboardedAtom, userAtom } from '~state'
import { User } from '~types'
import { generateUserId } from '~generators'
import { ActionCreateUser } from '~actions'
import { useTheme } from '~hooks'


export const OnboardScreen = () => {
  const setIsUserOnboarded = useSetAtom(isUserOnboardedAtom)

  const slidesRef = React.useRef(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [currentScreen, setCurrentScreen] = React.useState<number>(0)

  const setUser = useSetAtom(userAtom)

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentScreen(viewableItems[0].index)
  }).current

  const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const { theme } = useTheme()


  const handleSettingUserAccount = async () => {
    // when the user gets here we want to set the onboarding to true
    await storeData(ASYNC_STORAGE_KEYS.ONBOARDED, 'true')
    setIsUserOnboarded(true)
    // we want to generate a new user for them which would be stored on their device
    const data: User = {
      id: generateUserId(),
      email: '',
      name: randomNameGenerator(),
      isAccountVerified: false
    }

    // we want to set the user to be logged in
    await storeData('USERID', data.id)
    await ActionCreateUser(data, data.id)
    setUser(data)
  }

  const handleSkip = () => {
    handleSettingUserAccount()
    // navigate(ROUTES.LOGIN)
  }

  const handleNext = async () => {
    if (currentScreen < screens.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentScreen + 1 })
    } else {
      handleSettingUserAccount()
    }
  }

  return (
    <SafeAreaView style={styles.OnboardScreen}>
      <View style={styles.OnboardScreen_Container}>
        <View style={styles.OnboardScreen_SkipTextContainer}>
          <Text style={styles.OnboardScreen_SkipText} onPress={handleSkip}>Skip</Text>
        </View>
        <View style={styles.OnboardScreen_CurrentScreen}>
          <FlatList
            data={screens}
            renderItem={({ item }) => <OnboardItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <View style={styles.OnboardInformation_ActionBtn}>
          <View>
            <CustomSlider data={screens} scrollX={scrollX} />
          </View>
          <NextBtn handleNext={handleNext} currentScreen={currentScreen} />
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
    justifyContent: 'space-between'
  },
  OnboardScreen_Icon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100,
    height: '50%'
  },
  OnboardScreen_SkipTextContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20,
    height: '5%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  OnboardInformation_ActionBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '10%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 25
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
