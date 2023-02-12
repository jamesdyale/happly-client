import { View, Text, Button, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai'
import { textAtom } from '../../../App'
import { APP_GRAY, APP_WHITE, MAIN_ACCENT_COLOR, MAIN_BG_COLOR } from '../../../styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { CustomButton, CustomSwitch, CustomTextInput, CustomProgressBar } from '../../../components'
import { progressBarCalculation } from '../../../shared/utils'

const habits = [
  {
    id: 1,
    name: 'Meditate',
    progress: 0,
    completed: false
  },
  {
    id: 2,
    name: 'Meditate',
    progress: 100,
    completed: true
  }
]

export const Home = ({ navigation }) => {
  const [text] = useAtom(textAtom)
  const [customText, onChangeCustomText] = React.useState('Useless Text')
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const progressCount = progressBarCalculation(habits)

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_BG_COLOR
    }}>
      <ScrollView>
        <Ionicons name='md-checkmark-circle' size={32} color={MAIN_ACCENT_COLOR} />
        <CustomTextInput
          label='New Custom Text Input'
          value={customText}
          placeholder=''
          keyboardType='default'
          handleChange={onChangeCustomText}
        />
        <CustomButton
          icon={<Ionicons name='md-checkmark-circle' size={32} color={APP_WHITE} />}
          text='CREATE My Own'
          bgColor={MAIN_ACCENT_COLOR}
          color={APP_WHITE}
          onClick={() => console.log('eyh')}
        />
        <CustomButton
          text='CREATE My Own'
          bgColor={MAIN_ACCENT_COLOR}
          color={APP_WHITE}
          onClick={() => console.log('eyh')}
        />

        <Text>{text} world</Text>

        <CustomProgressBar progress={progressCount} />

        <CustomSwitch
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          thumbEnabledColor={APP_WHITE}
          trueTrackColor={MAIN_ACCENT_COLOR}
          thumbNonEnabledColor={APP_WHITE}
          falseTrackColor={MAIN_ACCENT_COLOR}
          iosBackgroundColor={APP_GRAY}
        />

        <Button title='Home' onPress={() => navigation.navigate('Home')} />
        <Button title='Onboard' onPress={() => navigation.navigate('Onboard')} />
        <Button title='AllHabits' onPress={() => navigation.navigate('AllHabits')} />
        <Button title='SingleHabit' onPress={() => navigation.navigate('SingleHabit', {
          habitId: 86
        })} />
        <Button title='Settings' onPress={() => navigation.navigate('Settings')} />
        <Button title='Rooms' onPress={() => navigation.navigate('AllRooms', {
          userId: 19
        })} />
        <Button title='Create Room' onPress={() => navigation.navigate('CreateRoom')} />
        <Button title='Room' onPress={() => navigation.navigate('SingleRoom', {
          roomId: 10
        })} />
        <Button title='All Challenges' onPress={() => navigation.navigate('AllChallenges')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
        <Button title='Create Challenge' onPress={() => navigation.navigate('CreateChallenge')} />
      </ScrollView>
    </SafeAreaView>
  )
}