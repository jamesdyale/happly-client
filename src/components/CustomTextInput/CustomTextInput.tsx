import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomTextInputType } from '../../shared'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'

export const CustomTextInput = ({ label, handleChange, value, placeholder, keyboardType }: CustomTextInputType) => {
  return (
    <View style={styles.textInput}>
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
  textInput: {
    marginBottom: 10
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19,
    color: '#0F0F0F'
  },
  input: {
    backgroundColor: '#FAFAFA',
    marginTop: 8,
    marginBottom: 8,
    border: '1px solid ',
    borderColor: '#B0C1CB',
    borderWidth: 1,
    paddingTop: 14.5,
    paddingBottom: 14.5,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})