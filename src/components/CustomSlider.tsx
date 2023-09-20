import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

export const CustomSlider = ({ data, scrollX }) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp"
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: theme.MAIN_ACCENT_COLOR,
                height: verticalScale(10),
                borderRadius: moderateScale(5),
                marginHorizontal: horizontalScale(8)
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  dot: {}
});
