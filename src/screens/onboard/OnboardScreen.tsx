import React from "react";
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CustomSlider } from "~components";
import { storeData, randomNameGenerator, verticalScale, horizontalScale, moderateScale } from "~utils";
import { screens } from "./components/ListOfScreens";
import { ASYNC_STORAGE_KEYS } from "~constants";
import { useSetAtom } from "jotai";
import { isUserOnboardedAtom, userAtom } from "~state";
import { User } from "~types";
import { generateUserId } from "~generators";
import { ActionCreateUser } from "~actions";
import { useTheme } from "~hooks";
import { registerForPushNotificationsAsync } from "~services";
import { OnboardItem } from "./components/OnboardItem";
import { NextBtn } from "./components/NextBtn";
import momentTime from "moment-timezone";

export const OnboardScreen = () => {
  const { theme } = useTheme();

  const setIsUserOnboarded = useSetAtom(isUserOnboardedAtom);

  const slidesRef = React.useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentScreen, setCurrentScreen] = React.useState<number>(0);

  const [alreadyViewedNotification, setAlreadyViewedNotification] = React.useState<boolean>(false);
  const setUser = useSetAtom(userAtom);

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentScreen(viewableItems[0].index);
  }).current;

  const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSettingUserAccount = async () => {
    // when the user gets here we want to set the onboarding to true
    await storeData(ASYNC_STORAGE_KEYS.ONBOARDED, "true");

    // we want to generate a new user for them which would be stored on their device
    const data: User = {
      id: generateUserId(),
      email: "",
      name: randomNameGenerator(),
      isAccountVerified: false,
      pushToken: "", // figure out a way to ask the user for permission to send push notifications
      timezone: momentTime.tz.guess()
    };

    // we want to set the user to be logged in
    await storeData(ASYNC_STORAGE_KEYS.USER_ID, data.id);
    await storeData(ASYNC_STORAGE_KEYS.USER_UUID, data.id);
    await ActionCreateUser(data, data.id);
    setUser(data);
    setIsUserOnboarded(true);
  };

  const handleSkip = () => {
    handleSettingUserAccount().then((r) => console.log("r", r));
    // navigate(ROUTES.LOGIN)
  };

  const handleNext = async () => {
    if (currentScreen < screens.length - 1) {
      if (currentScreen + 1 === 4) {
        // request permission to send push notifications
        if (!alreadyViewedNotification) {
          await registerForPushNotificationsAsync();
          setAlreadyViewedNotification(true);
        }
      }
      slidesRef.current.scrollToIndex({ index: currentScreen + 1 });
    } else {
      handleSettingUserAccount();
    }
  };

  const handleScroll = async () => {
    if (currentScreen + 1 === 4) {
      // request permission to send push notifications
      if (!alreadyViewedNotification) {
        await registerForPushNotificationsAsync();
        setAlreadyViewedNotification(true);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.OnboardScreen,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <View style={styles.OnboardScreen_Container}>
        <View
          style={[
            styles.OnboardScreen_SkipTextContainer,
            {
              marginBottom: verticalScale(10),
              paddingTop: verticalScale(10),
              paddingLeft: horizontalScale(20),
              paddingRight: horizontalScale(20)
            }
          ]}
        >
          <Text
            style={[
              styles.OnboardScreen_SkipText,
              {
                color: theme.MAIN_ACCENT_COLOR,
                fontSize: moderateScale(13),
                lineHeight: moderateScale(16)
              }
            ]}
            onPress={handleSkip}
          >
            Skip
          </Text>
        </View>
        <View style={styles.OnboardScreen_CurrentScreen}>
          <FlatList
            data={screens}
            renderItem={({ item }) => <OnboardItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false
            })}
            onScrollBeginDrag={handleScroll}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <View
          style={[
            styles.OnboardInformation_ActionBtn,
            {
              paddingTop: verticalScale(20),
              paddingBottom: verticalScale(20),
              paddingLeft: horizontalScale(20),
              paddingRight: horizontalScale(25)
            }
          ]}
        >
          <View>
            <CustomSlider data={screens} scrollX={scrollX} />
          </View>
          <NextBtn handleNext={handleNext} currentScreen={currentScreen} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  OnboardScreen: {},
  OnboardScreen_Container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  OnboardScreen_SkipTextContainer: {
    display: "flex",
    alignItems: "flex-end",
    height: "5%"
  },
  OnboardScreen_SkipText: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600"
  },
  OnboardScreen_CurrentScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "80%"
  },
  OnboardInformation_ActionBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "12%"
  }
});
