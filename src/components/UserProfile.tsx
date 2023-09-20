import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "../constants";
import { useAtomValue } from "jotai";
import { selectedDayOfTheWeekAtom } from "~state";
import moment from "moment/moment";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

export const UserProfile = () => {
  const { horizontalScale, moderateScale, verticalScale } = useMetric();
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);
  const monthNumber = moment(selectedDay, "MMMM Do YYYY").month();
  const year = moment(selectedDay, "MMMM Do YYYY").year();
  const month = moment.months(monthNumber);

  return (
    <>
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
                    lineHeight: verticalScale(24),
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
          <Icon name='settings' size={moderateScale(25)} color={theme.MAIN_TEXT_COLOR} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingLeft: horizontalScale(20),
          paddingBottom: verticalScale(10)
        }}
      >
        <Text
          style={[
            styles.monthAndYearText,
            {
              color: theme.MAIN_TEXT_COLOR_2,
              fontSize: moderateScale(15),
              lineHeight: verticalScale(19),
              marginRight: horizontalScale(5)
            }
          ]}
        >
          {month} {year}
        </Text>
      </View>
    </>
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
  },
  monthAndYearText: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    opacity: 0.5
  }
});
