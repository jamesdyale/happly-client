import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { CustomTextInputType } from "~types";
import { useTheme } from "~hooks";
import Icon from "react-native-vector-icons/Ionicons";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const CustomTextInput = ({
  bigLabel,
  label,
  handleChange,
  handleBlur = () => null,
  handleSubmit = (text: string) => null,
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
  error,
  icon,
  iconClicked
}: CustomTextInputType) => {
  const { theme } = useTheme();

  return (
    <View style={styles.textInput}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.MAIN_TEXT_COLOR
            }
          ]}
        >
          {label}
        </Text>
      )}
      {bigLabel && (
        <Text
          style={[
            styles.bigLabel,
            {
              color: theme.LIGHT_MAIN_TEXT_COLOR
            }
          ]}
        >
          {bigLabel}
        </Text>
      )}
      {icon && (
        <>
          <View
            style={[
              styles.inputWithIconSection,
              {
                backgroundColor: theme.INPUT_BG
              }
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: error ? "red" : theme.BORDER_COLOR,
                  color: theme.MAIN_TEXT_COLOR,
                  backgroundColor: theme.INPUT_BG,
                  flex: 1,
                  paddingTop: verticalScale(10),
                  paddingRight: horizontalScale(0),
                  paddingBottom: verticalScale(10),
                  paddingLeft: horizontalScale(16),
                  borderWidth: moderateScale(0)
                }
              ]}
              placeholderTextColor={theme.LIGHT_MAIN_TEXT_COLOR}
              onChangeText={handleChange}
              onBlur={handleBlur}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={(value) => handleSubmit(value.nativeEvent.text)}
            />
            <Icon
              style={styles.icon}
              name={icon}
              size={moderateScale(20)}
              color={theme.MAIN_TEXT_COLOR}
              onPress={iconClicked}
            />
          </View>
        </>
      )}
      {!icon && (
        <TextInput
          style={[
            styles.input,
            {
              borderColor: error ? "red" : theme.BORDER_COLOR,
              color: theme.MAIN_TEXT_COLOR,
              backgroundColor: theme.INPUT_BG
            }
          ]}
          placeholderTextColor={theme.LIGHT_MAIN_TEXT_COLOR}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: verticalScale(10)
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: moderateScale(14),
    lineHeight: verticalScale(19)
  },
  bigLabel: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: moderateScale(18),
    lineHeight: verticalScale(22)
  },
  input: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
    borderWidth: moderateScale(1),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14.5),
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    fontStyle: "normal",
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8)
  },
  error: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(16),
    color: "red"
  },
  inputWithIconSection: {
    // flex: 1,
    marginTop: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: verticalScale(50)
  },
  icon: {
    // paddingVertical: verticalScale(30),
    // paddingHorizontal: horizontalScale(30),
    marginRight: horizontalScale(10)
  }
});
