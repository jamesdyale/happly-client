import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { ProgressBarType } from "~types";
import { progressBarStatus, useMetric } from "~utils";
import { useTheme } from "~hooks";

export const CustomProgressBar = ({ progress }: ProgressBarType) => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  const sharedValueWidth = useSharedValue(progress);

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(`${sharedValueWidth.value}%`, {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1)
      })
    };
  });

  useEffect(() => {
    sharedValueWidth.value = progress;
  }, [progress]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.top,
          {
            marginBottom: verticalScale(10)
          }
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: moderateScale(12)
            }
          ]}
        >
          {progressBarStatus(progress)}
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: moderateScale(12)
            }
          ]}
        >
          {progress}%
        </Text>
      </View>
      <View
        style={[
          styles.bottom,
          {
            backgroundColor: theme.APP_GRAY,
            height: verticalScale(15),
            borderBottomLeftRadius: moderateScale(8),
            borderBottomRightRadius: moderateScale(8),
            borderTopLeftRadius: moderateScale(8),
            borderTopRightRadius: moderateScale(8)
          }
        ]}
      >
        <Animated.View
          style={[
            styles.innerBottom,
            style,
            {
              backgroundColor: theme.MAIN_ACCENT_COLOR,
              height: verticalScale(15),
              borderBottomLeftRadius: moderateScale(8),
              borderBottomRightRadius: moderateScale(8),
              borderTopLeftRadius: moderateScale(8),
              borderTopRightRadius: moderateScale(8)
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontFamily: "Inter_600SemiBold"
  },
  bottom: {
    width: "100%"
  },
  innerBottom: {
    width: "50%"
  }
});
