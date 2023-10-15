import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ButtonType } from "~types";
import { useTheme } from "~hooks";
import { useMetric } from "~utils";

export const CustomButton = ({
  icon,
  text,
  onClick,
  bgColor,
  color,
  disabled = false
}: ButtonType) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          marginTop: verticalScale(5),
          borderBottomLeftRadius: moderateScale(8),
          borderBottomRightRadius: moderateScale(8),
          borderTopLeftRadius: moderateScale(8),
          borderTopRightRadius: moderateScale(8)
        }
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      {disabled && (
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: theme.DISABLED_BUTTON_COLOR,
              paddingVertical: verticalScale(16),
              paddingHorizontal: horizontalScale(16)
            }
          ]}
        >
          <ActivityIndicator size='small' color={color} />
        </View>
      )}
      {!disabled && (
        <View
          style={[
            styles.buttonContainer,
            {
              paddingVertical: verticalScale(16),
              paddingHorizontal: horizontalScale(16)
            }
          ]}
        >
          {icon ? (
            <View
              style={[
                styles.icon,
                {
                  marginRight: horizontalScale(5)
                }
              ]}
            >
              {icon}
            </View>
          ) : null}
          <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: "100%"
  },
  icon: {},
  text: {
    fontWeight: "700"
  }
});
