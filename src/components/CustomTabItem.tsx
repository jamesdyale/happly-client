import { StyleSheet, Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { AddHabitIcon } from "~assets";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

const { width, height } = Dimensions.get("window");
console.log("width - ", width);
console.log("height - ", height);
export const CustomTabItem = (props) => {
  const { theme } = useTheme();
  const { icon, name, size, color, focused } = props;
  if (name !== "Create") {
    return (
      <View style={[styles.customTabItemContainer]}>
        <View style={styles.customTabItemIcon}>
          <Icon name={icon} size={size} color={focused ? color : theme.MAIN_TEXT_COLOR} />
        </View>
        <Text style={[styles.customTabItemTabName, { color: focused ? color : theme.MAIN_TEXT_COLOR }]}>{name}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.customTabItemContainer]}>
      <View style={styles.customTabItemPlusIcon}>
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
    width: horizontalScale(80),
    height: verticalScale(70),
    alignItems: "center",
    justifyContent: "center",
    bottom: verticalScale(-3)
  },
  customTabItemIcon: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center"
  },
  customTabItemPlusIcon: {
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: verticalScale(-40),
    zIndex: 999
  },
  customTabItemTabName: {
    fontSize: moderateScale(12),
    fontWeight: "bold"
  }
});
