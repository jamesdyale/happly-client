import { View, StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { useAtom } from "jotai";
import { selectedHabitAtom } from "~state";
import { APP_WHITE, MAIN_ACCENT_COLOR } from "~styles";
import React from "react";
import { useTheme } from "~hooks";
import { horizontalScale, moderateScale, verticalScale } from "~utils";
import { EditModalTitle } from "./components/EditModalTitle";
import { EditModalBody } from "./components/EditModalBody";
import { EditModalAction } from "./components/EditModalAction";

export const EditHabitModal = () => {
  const { theme } = useTheme();

  const [habitSelected, setSelectedHabit] = useAtom(selectedHabitAtom);

  if (habitSelected === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={!!habitSelected}
        key={habitSelected.id}
        style={{ padding: 0, margin: 0 }}
        onBackdropPress={() => setSelectedHabit(null)}
        hideModalContentWhileAnimating={true}
      >
        <SafeAreaView
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            alignItems: "center"
          }}
        >
          <View
            style={[
              styles.bodySectionContainer,
              {
                backgroundColor: theme.MAIN_BG_COLOR
              }
            ]}
          >
            <EditModalTitle />
            <EditModalBody />
            <EditModalAction />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bodySectionContainer: {
    width: "100%",
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: 0,
    borderRadius: moderateScale(20),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    paddingLeft: horizontalScale(30),
    paddingRight: horizontalScale(30),
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingBottom: verticalScale(15)
  },
  bodySection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9"
  },
  actionSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10)
  },
  actionSectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(100)
  },
  habitTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(3)
  },
  highlightText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(10),
    lineHeight: verticalScale(12)
  },
  infoText: {
    fontFamily: "Inter_500Medium",
    fontSize: moderateScale(12),
    lineHeight: verticalScale(15),
    marginTop: verticalScale(3)
  },
  icon: {
    marginRight: horizontalScale(15)
  },
  closeIcon: {
    backgroundColor: MAIN_ACCENT_COLOR,
    width: horizontalScale(30),
    height: verticalScale(30),
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    paddingLeft: horizontalScale(2),
    paddingRight: horizontalScale(2),
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(15),
    color: APP_WHITE
  }
});
