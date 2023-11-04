import { View, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { useMetric } from "~utils";

export const OnboardItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const { horizontalScale, verticalScale } = useMetric();

  return (
    <View
      style={[
        styles.ItemContainer,
        {
          width,
          paddingTop: verticalScale(10),
          paddingLeft: horizontalScale(50),
          paddingRight: horizontalScale(50)
        }
      ]}
    >
      {item.component}
    </View>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {}
});
