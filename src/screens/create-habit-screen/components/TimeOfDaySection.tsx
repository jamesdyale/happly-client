import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";
import { TimeOfDay } from "~types";

export const TimeOfDaySection = ({ timeOfDay, setTimeOfDay }) => {
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
        In which time of the day would you like to do it?
      </Text>
      <View
        style={[
          styles.periodContainer,
          {
            marginBottom: verticalScale(20)
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.periodOption,
            {
              backgroundColor:
                timeOfDay === TimeOfDay.Morning
                  ? theme.APP_BLUE
                  : theme.APP_GRAY,
              marginRight: horizontalScale(15),
              borderRadius: moderateScale(10),
              height: verticalScale(40)
            }
          ]}
          onPress={() => setTimeOfDay(TimeOfDay.Morning)}
        >
          <Image
            style={{
              width: horizontalScale(15),
              height: verticalScale(15),
              marginRight: horizontalScale(8)
            }}
            source={require("../../../../assets/svgs/sunrise1.png")}
          />
          <Text
            style={[
              styles.periodOptionTitle,
              {
                color:
                  timeOfDay === TimeOfDay.Morning
                    ? theme.APP_WHITE
                    : theme.APP_BLACK,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22)
              }
            ]}
          >
            Morning
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.periodOption,
            {
              marginRight: horizontalScale(15),
              backgroundColor:
                timeOfDay === TimeOfDay.Afternoon
                  ? theme.APP_BLUE
                  : theme.APP_GRAY,
              borderRadius: moderateScale(10),
              height: verticalScale(40)
            }
          ]}
          onPress={() => setTimeOfDay(TimeOfDay.Afternoon)}
        >
          <Image
            style={{
              width: horizontalScale(15),
              height: verticalScale(15),
              marginRight: horizontalScale(8)
            }}
            source={require("../../../../assets/svgs/sun1.png")}
          />
          <Text
            style={[
              styles.periodOptionTitle,
              {
                color:
                  timeOfDay === TimeOfDay.Afternoon
                    ? theme.APP_WHITE
                    : theme.APP_BLACK,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22)
              }
            ]}
          >
            Afternoon
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.periodOption,
            {
              backgroundColor:
                timeOfDay === TimeOfDay.Evening
                  ? theme.APP_BLUE
                  : theme.APP_GRAY,
              borderRadius: moderateScale(10),
              height: verticalScale(40)
            }
          ]}
          onPress={() => setTimeOfDay(TimeOfDay.Evening)}
        >
          <Image
            style={{
              width: horizontalScale(15),
              height: verticalScale(15),
              marginRight: horizontalScale(8)
            }}
            source={require("../../../../assets/svgs/crescent-moon1.png")}
          />
          <Text
            style={[
              styles.periodOptionTitle,
              {
                color:
                  timeOfDay === TimeOfDay.Evening
                    ? theme.APP_WHITE
                    : theme.APP_BLACK,
                fontSize: moderateScale(14),
                lineHeight: verticalScale(22),
                borderRadius: moderateScale(10)
              }
            ]}
          >
            Evening
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
  periodContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  periodOption: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  periodOptionTitle: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    display: "flex"
  }
});
