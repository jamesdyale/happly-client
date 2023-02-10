import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomTextInputType } from '../../shared'
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter'


export const CustomTextInput = ({ label, handleChange, value, placeholder, keyboardType }: CustomTextInputType) => {

  let [fontsLoaded] = useFonts({
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: '#0F0F0F'
  },
  input: {
    backgroundColor: '#FAFAFA',
    marginTop: 5,
    marginBottom: 5,
    border: '1px solid ',
    borderColor: '#B0C1CB',
    borderWidth: 1,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})