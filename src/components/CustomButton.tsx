import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ButtonType } from '~types'
import { useTheme } from '~hooks'

export const CustomButton = ({ icon, text, onClick, bgColor, color, disabled = false }: ButtonType) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]}
                      onPress={onClick}
                      disabled={disabled}
    >
      {disabled &&
        <View style={[styles.buttonContainer, {
          backgroundColor: theme.DISABLED_BUTTON
        }]}>
          <ActivityIndicator size='small' color={color} />
        </View>
      }
      {!disabled && <View style={styles.buttonContainer}>
        {icon ? <View style={styles.icon}>
          {icon}
        </View> : null}
        <Text style={[styles.text, { color }]}>{text}</Text>
      </View>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    width: '100%',
    padding: 16
  },
  icon: {
    marginRight: 5
  },
  text: {
    fontWeight: '700'
  }
})
