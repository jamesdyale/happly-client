import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonType } from "~types";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";

export const CustomButton = ({ icon, text, onClick, bgColor, color, disabled = false }: ButtonType) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={onClick} disabled={disabled}>
      {disabled && (
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: theme.DISABLED_BUTTON_COLOR
            }
          ]}
        >
          <ActivityIndicator size='small' color={color} />
        </View>
      )}
      {!disabled && (
        <View style={styles.buttonContainer}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(5),
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8)
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: "100%",
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16)
  },
  icon: {
    marginRight: horizontalScale(5)
  },
  text: {
    fontWeight: "700"
  }
});
