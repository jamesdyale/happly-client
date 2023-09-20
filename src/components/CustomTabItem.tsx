import { StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

const { width, height } = Dimensions.get("window");

export const CustomTabItem = (props) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const { icon, name, size, color, focused } = props;
  if (name !== "Create") {
    return (
      <View
        style={[
          styles.customTabItemContainer,
          {
            width: horizontalScale(80),
            height: verticalScale(70),
            bottom: verticalScale(-3)
          }
        ]}
      >
        <View
          style={[
            styles.customTabItemIcon,
            {
              width: horizontalScale(50),
              height: verticalScale(50),
              borderRadius: moderateScale(25)
            }
          ]}
        >
          <Icon name={icon} size={size} color={focused ? color : theme.MAIN_TEXT_COLOR} />
        </View>
        <Text
          style={[
            styles.customTabItemTabName,
            { color: focused ? color : theme.MAIN_TEXT_COLOR, fontSize: moderateScale(12) }
          ]}
        >
          {name}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.customTabItemContainer,
        {
          width: horizontalScale(80),
          height: verticalScale(70),
          bottom: verticalScale(-3)
        }
      ]}
    >
      <View
        style={[
          styles.customTabItemPlusIcon,
          {
            borderRadius: moderateScale(25),
            top: verticalScale(-40)
          }
        ]}
      >
        <View
          style={{
            width: width === 820 ? 120 : 75,
            height: height === 1180 ? 120 : 75,
            borderRadius: height === 1180 ? 60 : 37.5,
            marginTop: height === 1180 ? -10 : 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.MAIN_ACCENT_COLOR
          }}
        >
          <Icon
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              position: "relative",
              // backgroundColor: "red",
              marginLeft: height === 1180 ? 10 : 5,
              marginTop: height === 1180 ? 5 : 5
            }}
            name='add'
            size={width === 820 ? 90 : 60}
            color={theme.APP_WHITE}
          />
        </View>
        {/* <AddHabitIcon {...props} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customTabItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  customTabItemIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  customTabItemPlusIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 999
  },
  customTabItemTabName: {
    fontWeight: "bold"
  }
});
