import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { CustomTextInputType } from "~types";
import { useTheme } from "~hooks";
import Icon from "react-native-vector-icons/Ionicons";
import { useMetric } from "~utils";

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
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  return (
    <View
      style={[
        styles.textInput,
        {
          marginBottom: verticalScale(10)
        }
      ]}
    >
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.MAIN_TEXT_COLOR,
              fontSize: moderateScale(14),
              lineHeight: verticalScale(19)
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
              color: theme.LIGHT_MAIN_TEXT_COLOR,
              fontSize: moderateScale(18),
              lineHeight: verticalScale(22)
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
                backgroundColor: theme.INPUT_BG,
                marginTop: verticalScale(10),
                height: verticalScale(50)
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
                  marginTop: verticalScale(8),
                  marginBottom: verticalScale(8),
                  borderWidth: moderateScale(1),
                  paddingHorizontal: horizontalScale(16),
                  paddingVertical: verticalScale(14.5),
                  borderBottomLeftRadius: moderateScale(8),
                  borderBottomRightRadius: moderateScale(8),
                  borderTopLeftRadius: moderateScale(8),
                  borderTopRightRadius: moderateScale(8)
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
              style={[
                styles.icon,
                {
                  marginRight: horizontalScale(10)
                }
              ]}
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
              backgroundColor: theme.INPUT_BG,
              marginTop: verticalScale(8),
              marginBottom: verticalScale(8),
              borderWidth: moderateScale(1),
              paddingHorizontal: horizontalScale(16),
              paddingVertical: verticalScale(14.5),
              borderBottomLeftRadius: moderateScale(8),
              borderBottomRightRadius: moderateScale(8),
              borderTopLeftRadius: moderateScale(8),
              borderTopRightRadius: moderateScale(8)
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
      {error && (
        <Text
          style={[
            styles.error,
            {
              fontSize: moderateScale(12),
              lineHeight: verticalScale(16)
            }
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {},
  label: {
    fontFamily: "Inter_500Medium",
    fontStyle: "normal",
    fontWeight: "500"
  },
  bigLabel: {
    fontFamily: "Inter_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600"
  },
  input: {
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    fontStyle: "normal"
  },
  error: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Inter_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    color: "red"
  },
  inputWithIconSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  icon: {}
});
