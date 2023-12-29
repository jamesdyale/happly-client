import React, { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "~hooks";
import { horizontalScale, useMetric } from "~utils";
import LottieView from "lottie-react-native";
import { useAtom } from "jotai";
import { habitMarkedAsDoneAtom } from "~state";

const { width } = Dimensions.get("window");

const generatedText = () => {
  const texts = [
    "Great job!",
    "Awesome!",
    "You're doing great!",
    "Keep it up!",
    "You're on fire!",
    "You're a rockstar!",
    "You're a legend!",
    "You're a beast!",
    "You're a machine!",
    "You're a wizard!",
    "You're a superhero!",
    "You're a champion!",
    "You're a winner!",
    "You're a star!",
    "You're a genius!",
    "You're a boss!",
    "You're a legend!",
    "You're a beast!",
    "You're a machine!",
    "You're a wizard!",
    "You're a superhero!",
    "You're a champion!",
    "You're a winner!",
    "You're a star!",
    "You're a genius!",
    "You're a boss!"
  ];

  const random = Math.floor(Math.random() * texts.length);

  return `Congratulations! ${texts[random]}`;
};

export const CompleteHabitModal = () => {
  const { theme } = useTheme();
  const { moderateScale } = useMetric();
  const [habitMarkedAsDone, setHabitMarkedAsDone] = useAtom(habitMarkedAsDoneAtom);

  useEffect(() => {
    const timer = setInterval(() => setHabitMarkedAsDone(false), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Modal style={{ margin: 0, padding: 0 }} isVisible={habitMarkedAsDone} hideModalContentWhileAnimating={true} animationIn={"slideInUp"} animationOut={"slideInDown"}>
      <View style={[styles.container, { backgroundColor: theme.SECONDARY_BG_COLOR }]}>
        <SafeAreaView>
          <View style={styles.animationBody}>
            <Text style={[styles.animationText, { fontSize: width === 820 ? moderateScale(20) : moderateScale(16), color: theme.MAIN_TEXT_COLOR }]}>{generatedText()}</Text>
            <LottieView source={require("~assets/lottie/done.json")} autoPlay loop={false} speed={0.65} style={{ width: horizontalScale(400), height: horizontalScale(400) }} />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  animationBody: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  animationText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center"
  }
});
