import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_BLACK, APP_WHITE, MAIN_ACCENT_COLOR, SECONDARY_BG_COLOR } from '../../styles'

export const DeleteHabitModal = () => {
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={true}>
        <View style={styles.bodySection}>
          <Text style={styles.infoText}>Are you sure you want to delete this habit?</Text>
        </View>
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionSectionButton}>
            <Text style={styles.infoText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionSectionButton}>
            <Text style={styles.infoText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    opacity: 0.5
  },
  bodySection: {},
  actionSection: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  actionSectionButton: {},
  infoText: {}

})