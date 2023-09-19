import { View, Text, SafeAreaView, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "~hooks";
import { CustomButton, CustomTextInput } from "~components";
import { formValidationOnBlur, useMetric } from "~utils";

export const CreateChallengeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [duration, setDuration] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateChallenge = () => {};

  return (
    <SafeAreaView
      style={[
        styles.CreateChallengeContainer,
        {
          backgroundColor: theme.SECONDARY_BG_COLOR
        }
      ]}
    >
      <KeyboardAvoidingView
        behavior='padding'
        style={[
          styles.CreateChallengeForm,
          {
            paddingVertical: verticalScale(20),
            paddingHorizontal: horizontalScale(20)
          }
        ]}
      >
        <View style={styles.CreateChallengeFormHeader}>
          <Icon
            name='chevron-back'
            size={moderateScale(25)}
            color={theme.APP_BLACK}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[
              styles.CreateChallengeFormBodyText,
              {
                fontSize: moderateScale(24),
                marginLeft: horizontalScale(20)
              }
            ]}
          >
            Create Challenge
          </Text>
        </View>
        <View
          style={[
            styles.CreateChallengeFormBody,
            {
              marginTop: verticalScale(20)
            }
          ]}
        >
          <View>
            <CustomTextInput
              label='Challenge Name'
              placeholder='Enter the challenge name'
              handleChange={setName}
              handleBlur={() => setNameError(formValidationOnBlur("name", name))}
              value={name}
              error={nameError}
            />
            <CustomTextInput
              label='Challenge Description'
              placeholder='Enter the description of the challenge'
              handleChange={setDescription}
              handleBlur={() =>
                setDescriptionError(formValidationOnBlur("description", description))
              }
              value={description}
              error={descriptionError}
            />
            <CustomTextInput
              label='HashTags'
              placeholder='Enter hashtags for the challenge to improve searchability'
              handleChange={setHashtags}
              value={hashtags}
            />
            <CustomTextInput
              label='Duration'
              placeholder='Enter the duration of the challenge'
              handleChange={setDuration}
              value={duration}
            />
          </View>
          <View style={{ marginTop: verticalScale(-30) }}>
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.APP_WHITE}
              text='Create Challenge'
              onClick={handleCreateChallenge}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CreateChallengeContainer: {},
  CreateChallengeForm: {
    height: "100%"
  },
  CreateChallengeFormHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  CreateChallengeFormBody: {
    display: "flex",
    justifyContent: "space-between",
    height: "90%"
  },
  CreateChallengeFormBodyText: {
    fontFamily: "Inter_700Bold",
    fontStyle: "normal",
    fontWeight: "700"
  }
});
