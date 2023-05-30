import React from 'react'
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { GRAY_TEXT, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../../../styles'
import { CustomSlider } from '../../../../components'
import { NextBtn, OnboardItem, screens } from './components/UtilsComponents'


export const OnboardScreen = ({ navigation }) => {
  const slidesRef = React.useRef(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [currentScreen, setCurrentScreen] = React.useState<number>(0)

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentScreen(viewableItems[0].index)
  }).current

  const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const handleSkip = () => {
    navigation.navigate('MainApp')
  }

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentScreen + 1 })
    } else {
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
