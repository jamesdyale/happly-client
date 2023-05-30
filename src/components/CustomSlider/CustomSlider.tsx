import { StyleSheet, Text, View } from 'react-native'
import { APP_GRAY, HABIT_OPTION, MAIN_ACCENT_COLOR } from '../../styles'
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter'

export const CustomSlider = ({ total, current }: {
  total: number;
  current: number
}) => {
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      {Array(total).fill(1).map(
        (_, index) => {
          const currentIndex = index + 1
          if (currentIndex === current) {
            return (
              <View key={index} style={styles.currentScreen}>
              </View>
            )
          }
          return (
            <View key={index} style={{
              ...styles.notCurrentScreen,
              backgroundColor: currentIndex < current ? MAIN_ACCENT_COLOR : APP_GRAY
            }}>
            </View>
          )
        }
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  currentScreen: {
    backgroundColor: MAIN_ACCENT_COLOR,
    width: 30,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  notCurrentScreen: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10
  }
})
