import {
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  CustomButton,
  CustomTextInput
} from "../../../../../components";
import {
  APP_WHITE,
  MAIN_ACCENT_COLOR
} from "../../../../../styles";
import React
  from "react";

type IForm = {
  changeBetweenForms: () => void
}


export const LoginForm = ({ changeBetweenForms }: IForm) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitLogin = () => {
    console.log("submit login");
  };

  return (
    <View
      style={styles.AuthForm}>
      <View
        style={styles.AuthFormHeaderContainer}>
        <Text
          style={styles.AuthFormHeader}>Welcome
          Back
          ✌️✌️</Text>
        <Text
          style={styles.AuthFormInfo}>Enter
          login
          details
          to
          get
          started.</Text>
        <View
          style={styles.AuthFormBody}>
          <CustomTextInput
            label="Email Address"
            placeholder="Enter Email Address"
            handleChange={(e) => setEmail(e)}
            handleBlur={() => console.log("blur")}
            value={email}
          />
          <CustomTextInput
            label="Password"
            placeholder="Enter Password"
            handleChange={(e) => setPassword(e)}
            handleBlur={() => console.log("blur")}
            value={password}
          />
        </View>
      </View>
      <View
        style={styles.AuthFormActionBtn}>
        <Text
          style={styles.ActionTextContainer}>
          <Text
            style={styles.ActionText}>Don't
            have
            an
            account? </Text>
          <Text
            style={styles.HighlightedText}
            onPress={changeBetweenForms}>Sign
            Up</Text>
        </Text>
        <CustomButton
          bgColor={MAIN_ACCENT_COLOR}
          color={APP_WHITE}
          text={"Login"}
          onClick={submitLogin}
        />
        <View
          style={styles.ActionTextContainer}>
          <Text
            style={styles.ActionText}>Forgot
            Password? </Text>
          <Text style={styles.HighlightedText}
                onPress={() => console.log("navigate to password recovery")}>
            Recover Password</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AuthForm: {
    height: "100%",
    paddingTop: 80,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between"
  },
  AuthFormHeaderContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  AuthFormHeader: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 12
  },
  AuthFormInfo: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#959595"
  },
  AuthFormBody: {
    marginTop: 40
  },
  AuthFormActionBtn: {
    display: "flex",
    alignItems: "center"
  },
  HighlightedText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.25,
    color: MAIN_ACCENT_COLOR
  },
  ActionTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 20
    // width: '40%',
    // height: '100%'
  },
  ActionText: {
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    letterSpacing: 0.25,
    color: "#686868"
  }
});
