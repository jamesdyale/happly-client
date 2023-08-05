import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Modal } from 'react-native'
import { APP_BLACK, APP_RED, APP_WHITE, GRAY_TEXT, SECONDARY_BG_COLOR } from '~styles'
import { useToast } from 'react-native-toast-notifications'

export const ThemeSwitchModal = () => {
  const toast = useToast()
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={true}>
        <SafeAreaView
          style={{ display: 'flex', flex: 1, position: 'relative', alignItems: 'center' }}>
          <View
            style={styles.bodySectionContainer}>
            <View style={styles.bodySection}>
              <Text style={styles.mainBodyHeader}>Pause a habit? It's still on your schedule and can be resumed when
                you're ready.</Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity style={{ ...styles.actionSectionButton }}
                                onPress={() => toast.show('Habit deleted',
                                  { type: 'success' })}>
                <Text style={{ color: APP_BLACK, ...styles.infoText }}>GOT IT</Text>
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
  mainBodyHeader: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    color: GRAY_TEXT
  },
  actionSectionButton: {
    borderRadius: 10,
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  infoText: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'right'
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
