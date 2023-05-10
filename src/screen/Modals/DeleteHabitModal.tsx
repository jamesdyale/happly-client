import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Modal } from 'react-native'
import { APP_BLACK, APP_RED, APP_WHITE, GRAY_TEXT, SECONDARY_BG_COLOR } from '../../styles'

export const DeleteHabitModal = () => {
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={true}>
        <SafeAreaView
          style={{ display: 'flex', flex: 1, position: 'relative', alignItems: 'center' }}>
          <View
            style={styles.bodySectionContainer}>
            <View style={styles.bodySection}>
              <Text style={styles.mainBodyHeader}>Delete Habit?</Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity style={{ ...styles.actionSectionButton, ...styles.exitBtn }}>
                <Text style={{ color: APP_BLACK, ...styles.infoText }}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.actionSectionButton, ...styles.goForwardWithActionBtn }}>
                <Text style={{ color: APP_WHITE, ...styles.infoText }}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_BG_COLOR,
    opacity: 0.3
  },
  bodySectionContainer: {
    width: '80%',
    marginTop: 30,
    position: 'absolute',
    bottom: 150,
    backgroundColor: APP_WHITE,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  bodySection: {},
  actionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  actionSectionButton: {
    borderRadius: 10,
    padding: 15,
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBodyHeader: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: GRAY_TEXT
  },
  infoText: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17
  },
  exitBtn: {
    borderColor: '#B0C1CB',
    borderWidth: 1
  },
  goForwardWithActionBtn: {
    borderColor: APP_RED,
    backgroundColor: APP_RED,
    borderWidth: 1
  }

})