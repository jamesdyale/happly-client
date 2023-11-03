import { View, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useMetric } from "~utils";
import { useTheme } from "~hooks";

export const ActionSection = ({
  navigation,
  handleOnPressEdit,
  handleOnPressPause,
  handleOnPressDelete
}) => {
  const { theme } = useTheme();
  const { horizontalScale, verticalScale, moderateScale } = useMetric();

  return (
    <View
      style={[
        styles.header,
        {
          marginBottom: verticalScale(15)
        }
      ]}
    >
      <Icon
        name='chevron-back-outline'
        size={moderateScale(25)}
        color={theme.HABIT_SCREEN_ACTION_ICON_COLOR}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View
        style={[
          styles.headerOptions,
          {
            width: horizontalScale(100)
          }
        ]}
      >
        <Icon
          name='create-outline'
          size={moderateScale(25)}
          color={theme.HABIT_SCREEN_ACTION_ICON_COLOR}
          onPress={handleOnPressEdit}
        />
        <Icon
          name='pause-outline'
          size={moderateScale(25)}
          color={theme.HABIT_SCREEN_ACTION_ICON_COLOR}
          onPress={handleOnPressPause}
        />
        <Icon
          name='trash-outline'
          size={moderateScale(25)}
          color={theme.HABIT_SCREEN_ACTION_ICON_COLOR}
          onPress={handleOnPressDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {},
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
