import Svg, { Defs, G, Path, Rect } from "react-native-svg";
import React from "react";
import { StyleSheet } from "react-native";

export const AddHabitIcon = (props) => (
  <Svg width={79} height={79} fill='none' xmlns='http://www.w3.org/2000/svg' {...props} style={styles.addHabitIcon}>
    <G filter='url(#a)'>
      <Rect x={12} y={8} width={55} height={55} rx={27.5} fill='#ED9107' />
      <Path
        d='M48.417 37.139H41.13v7.26c0 1.18-.95 2.13-2.13 2.13s-2.13-.95-2.13-2.13v-7.26h-7.26a2.163 2.163 0 0 1-2.13-2.155c0-.567.231-1.104.616-1.514.41-.385.95-.616 1.514-.616h7.26V25.62c0-1.18.95-2.13 2.13-2.13s2.13.95 2.13 2.13v7.235h7.287c1.18 0 2.13.95 2.13 2.13s-.95 2.13-2.13 2.155Z'
        fill='#fff'
      />
    </G>
    <Defs></Defs>
  </Svg>
);

const styles = StyleSheet.create({
  addHabitIcon: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  }
});
