import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import React from "react";
import {
  OnboardScreenFiveIcon,
  OnboardScreenTwoIcon,
  OnboardScreenFourIcon,
  OnboardScreenThreeIcon,
  OnboardScreenOneIcon
} from "~assets";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

const { width } = Dimensions.get("window");

const OnboardScreenOne = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenOneIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          Welcome to Happly
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            ,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          Build healthier habits with daily plans and mindful reminders that will help you stay
          accountable.
        </Text>
      </View>
    </>
  );
};

const OnboardScreenTwo = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenTwoIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          A better version of you
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            ,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          You can build up a new habit or quit an existing bad one with Happly.
        </Text>
      </View>
    </>
  );
};

const OnboardScreenThree = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenThreeIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          Visualize your efforts
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            ,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          We provide you with a daily report of your progress and a weekly analysis of your results.
        </Text>
      </View>
    </>
  );
};

const OnboardScreenFour = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenFourIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          How do we help you stick to your habits
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          We use a combination of psychology and technology to help you build healthier habits.
        </Text>
      </View>
    </>
  );
};

const OnboardScreenFive = () => {
  const { theme } = useTheme();
  const { verticalScale, moderateScale } = useMetric();

  return (
    <>
      <View
        style={[
          styles.OnboardScreen_Icon,
          {
            marginBottom: verticalScale(50)
          }
        ]}
      >
        <OnboardScreenFiveIcon />
      </View>

      <View style={styles.OnboardInformation}>
        <Text
          style={[
            styles.OnboardInformation_Title,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(30) : moderateScale(25),
              lineHeight: width === 820 ? verticalScale(60) : verticalScale(55),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          Feeling motivated already?
        </Text>
        <Text
          style={[
            styles.OnboardInformation_Text,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: width === 820 ? moderateScale(16) : moderateScale(16),
              lineHeight: moderateScale(24),
              marginBottom: verticalScale(20)
            }
          ]}
        >
          “If you get better 1% every day for one year you will end up 37 times better by the time
          you are done”
        </Text>
      </View>
    </>
  );
};

export const screens = [
  {
    id: 1,
    component: <OnboardScreenOne />
  },
  {
    id: 2,
    component: <OnboardScreenTwo />
  },
  {
    id: 3,
    component: <OnboardScreenThree />
  },
  {
    id: 4,
    component: <OnboardScreenFour />
  },
  {
    id: 5,
    component: <OnboardScreenFive />
  }
];

export const OnboardItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const { horizontalScale, verticalScale } = useMetric();

  return (
    <View
      style={[
        styles.ItemContainer,
        {
          width,
          paddingTop: verticalScale(10),
          paddingLeft: horizontalScale(50),
          paddingRight: horizontalScale(50)
        }
      ]}
    >
      {item.component}
    </View>
  );
};

export const NextBtn = ({ handleNext, currentScreen }) => {
  const { theme } = useTheme();
  const { moderateScale } = useMetric();

  return (
    <TouchableOpacity onPress={handleNext}>
      <Text
        style={[
          styles.OnboardInformation_ActionBtn_NextBtn,
          {
            color: theme.MAIN_ACCENT_COLOR,
            fontSize: moderateScale(13),
            lineHeight: moderateScale(16)
          }
        ]}
      >
        {currentScreen < screens.length - 1 ? "Next" : "Get Started"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {},
  OnboardScreen_Container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  OnboardScreen_Icon: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    height: "50%",
    paddingTop: 50
  },
  OnboardInformation: {},
  OnboardInformation_Title: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",

    textAlign: "center"
  },
  OnboardInformation_Text: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center"
  },
  OnboardInformation_ActionBtn_NextBtn: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600"
  }
});
