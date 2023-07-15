import { View, Text, Button, KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { CustomButton, CustomTextInput } from '~components'
import { formValidationOnBlur } from '~utils'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '~hooks'


export const CreateRoomScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [invite, setInvite] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [inviteError, setInviteError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleCreateRoom = () => {

  }

  return (
    <SafeAreaView style={[styles.CreateRoomContainer, {
      backgroundColor: theme.SECONDARY_BG_COLOR
    }]}>
      <KeyboardAvoidingView behavior='padding' style={styles.CreateRoomForm}>
        <View style={styles.CreateRoomFormHeader}>
          <Icon name='chevron-back' size={25} color={theme.APP_BLACK} onPress={() => navigation.goBack()} />
          <Text style={styles.CreateRoomFormBodyText}>Create Challenge</Text>
        </View>
        <View style={styles.CreateRoomFormBody}>
          <View>
            <CustomTextInput
              label='Challenge Name'
              placeholder='Enter the challenge name'
              handleChange={setName}
              handleBlur={() => setNameError(formValidationOnBlur('name', name))}
              value={name}
              error={nameError}
            />
            <CustomTextInput
              label='Challenge Description'
              placeholder='Enter the description of the challenge'
              handleChange={setDescription}
              handleBlur={() => setDescriptionError(formValidationOnBlur('description', description))}
              value={description}
              error={descriptionError}
            />
            <CustomTextInput
              label='HashTags'
              placeholder='Enter hashtags for the challenge to improve searchability'
              handleChange={setInvite}
              handleBlur={() => setInviteError(formValidationOnBlur('invite', invite))}
              value={invite}
            />
          </View>
          <View style={{ marginTop: -30 }}>
            <CustomButton
              bgColor={theme.MAIN_ACCENT_COLOR}
              color={theme.APP_WHITE}
              text='Create Challenge'
              onClick={handleCreateRoom}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  CreateRoomContainer: {},
  CreateRoomForm: {
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  CreateRoomFormHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  CreateRoomFormBody: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    height: '90%'
  },
  CreateRoomFormBodyText: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    marginLeft: 20
  }
})
