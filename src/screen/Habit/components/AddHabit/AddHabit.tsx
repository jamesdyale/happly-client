import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomSwitch, CustomTextInput } from '../../../../components'
import { APP_GRAY, APP_WHITE, MAIN_ACCENT_COLOR } from '../../../../styles'


export const AddHabit = () => {
  const [isEnabled, setIsEnabled] = React.useState(false)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <TouchableOpacity onPress={() => {
        }}>
          Cancel
        </TouchableOpacity>
        <Text>New Habit</Text>
      </View>
      <View>
        <CustomTextInput label='Title' placeholder='Enter the title' />
        <CustomTextInput label='Description' placeholder='Enter the description' />
        <View>
          <Text>How often do you want to do it?</Text>
          <View>
            <Button title='Daily' onPress={() => {
            }} />
            <Button title='Weekly' onPress={() => {
            }} />
          </View>
        </View>
        <View>
          <Text>Every?</Text>
          <View>
            <TouchableOpacity onPress={() => {
            }}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text>1 week</Text>
            <TouchableOpacity onPress={() => {
            }}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>In which time of the day would you like to do it?</Text>
          <View>
            <TouchableOpacity onPress={() => {
            }}>
              <Text>Morning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
            }}>
              <Text>Afternoon</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
            }}>
              <Text>Evening</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text>Should we remind you?</Text>
            <CustomSwitch isEnabled={isEnabled}
                          toggleSwitch={toggleSwitch}
                          thumbEnabledColor={MAIN_ACCENT_COLOR}
                          thumbNonEnabledColor={APP_GRAY}
                          falseTrackColor={APP_WHITE}
                          trueTrackColor={APP_WHITE}
                          iosBackgroundColor={APP_GRAY}
            />
          </View>
        </View>
      </View>
      <Text>AddHabit</Text>
      <Text>AddHabit</Text>
    </SafeAreaView>
  )
}