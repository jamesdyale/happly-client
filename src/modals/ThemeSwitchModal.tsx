import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Modal, SafeAreaView, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { Themes } from '~constants'
import { useTheme } from '~hooks'
import { useAtomValue } from 'jotai'
import { selectedThemeAtom } from '~state'

export const ThemeSwitchModal = ({
                                   handleSelectTheme
                                 }: {
  handleSelectTheme: (theme: Themes) => void
}) => {
  const { theme } = useTheme()
  const selectedThemeValue = useAtomValue(selectedThemeAtom)
  console.log('selectedThemeValue', selectedThemeValue)

  return (
    <View style={[styles.container, {
      backgroundColor: theme.SECONDARY_BG_COLOR
    }]}>
      <Modal animationType='slide' transparent={true} visible={true}>
        <SafeAreaView
          style={{ display: 'flex', flex: 1, position: 'relative', alignItems: 'center' }}>
          <View
            style={[styles.bodySectionContainer, {
              backgroundColor: theme.APP_WHITE
            }]}>
            <View style={styles.bodySection}>
              <View style={styles.themeSelectionContainer}>
                <TouchableOpacity style={[styles.themeTextContainer, {
                  backgroundColor: `${selectedThemeValue === Themes.LIGHT ? theme.MAIN_ACCENT_COLOR : theme.BORDER_COLOR}`,
                  padding: 20,
                  // borderWidth: 1,
                  borderBottomLeftRadius: 20,
                  borderTopLeftRadius: 20
                }]} onPress={() => handleSelectTheme(Themes.LIGHT)}>
                  <Icon name='sunny' size={25}
                        color={selectedThemeValue === Themes.LIGHT ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR} />
                  <Text style={[{
                    marginLeft: 10,
                    color: `${selectedThemeValue === Themes.LIGHT ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR}`
                  }]}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.themeTextContainer, {
                  backgroundColor: `${selectedThemeValue === Themes.DARK ? theme.MAIN_ACCENT_COLOR : theme.CONTRAST_MAIN_TEXT_COLOR}`,
                  padding: 20,
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20
                }]} onPress={() => handleSelectTheme(Themes.DARK)}>
                  <Icon name='moon' size={25}
                        color={selectedThemeValue === Themes.DARK ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR} />
                  <Text style={[{
                    marginLeft: 10,
                    color: `${selectedThemeValue === Themes.DARK ? theme.CONTRAST_MAIN_TEXT_COLOR : theme.MAIN_TEXT_COLOR}`
                  }]}>Dark</Text>
                </TouchableOpacity>
              </View>
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
    opacity: 0.3
  },
  bodySectionContainer: {
    marginTop: 30,
    position: 'absolute',
    bottom: 150,
    borderRadius: 20,
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
  themeSelectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  themeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }


})
