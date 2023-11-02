import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";
import { Frequency } from "~types";

export const HabitFrequencySection = ({
  frequencyOption,
  setFrequencyOption
}) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  return (
    <View
      style={[
        styles.sectionContainer,
        {
          marginBottom: verticalScale(20)
        }
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.MAIN_TEXT_COLOR,
            fontSize: moderateScale(18),
            lineHeight: verticalScale(22),
            marginBottom: verticalScale(10)
          }
        ]}
      >
        How often do you want to do it?
      </Text>
      <View
        style={[
          styles.frequencyOptions,
          {
            borderRadius: moderateScale(6),
            height: verticalScale(40)
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.frequencyOption,
            {
              marginRight: horizontalScale(15),
              backgroundColor:
                frequencyOption === Frequency.Daily
                  ? theme.MAIN_TEXT_COLOR
                  : theme.DISABLED_BUTTON_COLOR,
              borderRadius: moderateScale(6)
            }
          ]}
          onPress={() => setFrequencyOption(Frequency.Daily)}
        >
          <Text
            style={[
              styles.frequencyOptionTitle,
              {
                color:
                  frequencyOption === Frequency.Daily
                    ? theme.CONTRAST_MAIN_TEXT_COLOR
                    : theme.MAIN_TEXT_COLOR,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22)
              }
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.frequencyOption,
            {
              backgroundColor:
                frequencyOption === Frequency.Weekly
                  ? theme.MAIN_TEXT_COLOR
                  : theme.DISABLED_BUTTON_COLOR,
              borderRadius: moderateScale(6)
            }
          ]}
          onPress={() => setFrequencyOption(Frequency.Weekly)}
        >
          <Text
            style={[
              styles.frequencyOptionTitle,
              {
                color:
                  frequencyOption === Frequency.Weekly
                    ? theme.CONTRAST_MAIN_TEXT_COLOR
                    : theme.MAIN_TEXT_COLOR,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22)
              }
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
  sectionTitle: {
    fontFamily: "Inter_600SemiBold"
  },
  frequencyOptions: {
    display: "flex",
    flexDirection: "row"
  },
  frequencyOption: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  frequencyOptionTitle: {
    fontFamily: "Inter_600SemiBold"
  }
});
