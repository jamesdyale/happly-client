import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native'
import { useTheme } from '~hooks'

export const CustomSlider = ({ data, scrollX }) => {
  const { theme } = useTheme()
  const { width } = useWindowDimensions()


  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })


        return (
          <Animated.View key={index.toString()}
                         style={[styles.dot, { width: dotWidth, opacity, backgroundColor: theme.MAIN_ACCENT_COLOR }]} />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8
  }

})
