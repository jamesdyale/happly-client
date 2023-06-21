import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CustomTextInputType } from '../../shared'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter'
import { GRAY_TEXT } from '../../styles'
import React from 'react'

export const CustomTextInput = ({
                                  bigLabel,
                                  label,
                                  handleChange,
                                  handleBlur,
                                  value,
                                  placeholder,
                                  keyboardType,
                                  secureTextEntry,
                                  error
                                }: CustomTextInputType) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.textInput}>
      {label && <Text style={styles.label}>{label}</Text>}
      {bigLabel && <Text style={styles.bigLabel}>{bigLabel}</Text>}
      <TextInput
        style={{ ...styles.input, borderColor: error ? 'red' : '#B0C1CB' }}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.error}>
        {error}
      </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
    color: '#0F0F0F'
  },
  bigLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: GRAY_TEXT
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
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: 'red'
  }
})
