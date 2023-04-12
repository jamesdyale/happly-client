import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomTextInputType } from '../../shared'

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
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
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