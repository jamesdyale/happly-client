import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter'
import { APP_GRAY, HABIT_OPTION, MAIN_ACCENT_COLOR } from '~styles'
import { ProgressBarType } from '~types'
import { progressBarStatus } from '~utils'
import { useTheme } from '~hooks'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  text: {
    fontFamily: 'Inter_600SemiBold'
  },
  bottom: {
    width: '100%',
    height: 15,
    backgroundColor: APP_GRAY,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  innerBottom: {
    width: '50%',
    height: 15,
    backgroundColor: MAIN_ACCENT_COLOR,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})

export const CustomProgressBar = ({ progress }: ProgressBarType) => {
  const { theme } = useTheme()

  const sharedValueWidth = useSharedValue(progress)

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(`${sharedValueWidth.value}%`, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1)
      })
    }
  })

  useEffect(() => {
    sharedValueWidth.value = progress
  }, [progress])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={[styles.text, { color: theme.MAIN_TEXT }]}>{progressBarStatus(progress)}</Text>
        <Text style={[styles.text, { color: theme.MAIN_TEXT }]}>{progress}%</Text>
      </View>
      <View style={styles.bottom}>
        <Animated.View style={[styles.innerBottom, style]} />
      </View>
    </View>
  )
}
