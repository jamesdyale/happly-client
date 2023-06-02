import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SECONDARY_BG_COLOR } from "../../../../styles";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";

export function AuthScreen() {
    const [formType, setFormType] = React.useState("login");


    const changeBetweenForms = () => {
        if (formType === "login") {
            setFormType("register");
        }
        if (formType === "register") {
            setFormType("login");
        }
    };

    return (
        <SafeAreaView style={styles.AuthScreenContainer}>
            {formType === "login" ? <LoginForm changeBetweenForms={changeBetweenForms} /> : <SignUpForm changeBetweenForms={changeBetweenForms} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AuthScreenContainer: {
        backgroundColor: SECONDARY_BG_COLOR,
    },
});
