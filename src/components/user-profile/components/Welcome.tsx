import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ROUTES } from "~constants";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

export const WelcomeMessage = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { horizontalScale, moderateScale, verticalScale } = useMetric();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft: horizontalScale(20),
          paddingRight: horizontalScale(20),
          paddingTop: verticalScale(20),
          paddingBottom: verticalScale(5)
        }
      ]}
    >
      <View style={styles.left}>
        <View>
          <View
            style={[
              styles.welcomeContainer,
              {
                marginBottom: verticalScale(5)
              }
            ]}
          >
            <Text
              style={[
                styles.welcomeText,
                {
                  fontSize: moderateScale(20),
                  lineHeight: moderateScale(24),
                  color: theme.MAIN_TEXT_COLOR
                }
              ]}
            >
              Welcome 👋
            </Text>
          </View>
        </View>
      </View>
      <View></View>
      <TouchableOpacity onPress={() => navigate(ROUTES.SETTINGS)}>
        <Icon
          name='settings'
          size={moderateScale(25)}
          color={theme.MAIN_TEXT_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "58%"
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "row"
  },
  welcomeText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal"
  }
});
