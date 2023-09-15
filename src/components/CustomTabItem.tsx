import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { AddHabitIcon } from "~assets";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const CustomTabItem = (props) => {
  const { theme } = useTheme();
  const { icon, name, size, color, focused } = props;
  if (name !== "Create") {
    return (
      <View style={[styles.customTabItemContainer, { backgroundColor: theme.SECONDARY_BG_COLOR }]}>
        <View style={styles.customTabItemIcon}>
          <Icon name={icon} size={size} color={focused ? color : theme.MAIN_TEXT_COLOR} />
        </View>
        <Text style={[styles.customTabItemTabName, { color: focused ? color : theme.MAIN_TEXT_COLOR }]}>{name}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.customTabItemContainer, { backgroundColor: theme.SECONDARY_BG_COLOR }]}>
      <View style={styles.customTabItemPlusIcon}>
        <AddHabitIcon {...props} />
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
    bottom: verticalScale(-10)
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
    top: verticalScale(-30)
  },
  customTabItemTabName: {
    fontSize: moderateScale(12),
    fontWeight: "bold"
  }
});
