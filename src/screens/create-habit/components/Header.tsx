import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";

export const Header = () => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View
      style={[
        styles.header,
        {
          marginBottom: verticalScale(20)
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.closeButton,
          {
            backgroundColor: theme.APP_PINK,
            marginRight: horizontalScale(40),
            borderRadius: moderateScale(6),
            width: horizontalScale(40),
            height: verticalScale(40)
          }
        ]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name='close' size={moderateScale(25)} color={theme.APP_RED} />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerText,
          {
            color: theme.MAIN_TEXT_COLOR,
            fontSize: moderateScale(30),
            lineHeight: verticalScale(36)
          }
        ]}
      >
        New <Text style={[styles.headerText, { color: "#9D9797" }]}> Habit</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  closeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontFamily: "Inter_700Bold",
    display: "flex"
  }
});
