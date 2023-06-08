import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomSwitch, CustomTextInput } from '../../../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DayOfTheWeek, Frequency, TimeOfDay } from '@shared/types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { dailyHabitsAtom, editHabitAtom, userAtom } from '@state/state'
import { generateHabitId } from '../../../../generators/generateId'
import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { useToast } from 'react-native-toast-notifications'
import { Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import {
  APP_BLACK,
  APP_BLUE,
  APP_GRAY,
  APP_PINK,
  APP_RED,
  APP_WHITE,
  GRAY_TEXT,
  MAIN_ACCENT_COLOR
} from '../../../../styles'
import { Habit } from '../../../../types/Habit'


export const AddHabitScreen = () => {
  const user = useAtomValue(userAtom)
  const toast = useToast()

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [editHabit, setEditHabit] = useAtom(editHabitAtom)
  const setDailyHabits = useSetAtom(dailyHabitsAtom)

  const [name, setName] = React.useState(editHabit?.name || '')
  const [description, setDescription] = React.useState(editHabit?.description || '')
  const [timeOfDay, setTimeOfDay] = React.useState(editHabit?.timeOfDay || TimeOfDay.Morning)
  const [dayOfWeek, setDayOfWeek] = React.useState<DayOfTheWeek>(editHabit?.dayOfWeek || DayOfTheWeek.Monday)
  const [frequencyOption, setFrequencyOption] = React.useState<Frequency>(editHabit?.frequencyOption || Frequency.Daily)
  const [isEnabled, setIsEnabled] = React.useState(false)

  // FIXME: Add this to be able to add reminders once I am done with push notification
  const toggleSwitch = () => setIsEnabled(false)
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const createHabit = async () => {
    const habit: Habit = {
      id: generateHabitId(),
      name,
      description,
      userId: user.id,
      timeOfDay,
      dayOfWeek,
      frequencyOption
    }

    await setDoc(doc(FIREBASE_DB, 'habits', habit.id), habit)

    // TODO: Add logic to check if we should add the new habit to daily habits atom
    setDailyHabits((prev) => [...prev, habit])
    setEditHabit(null)

    toast.show('Habit created successfully', {
      type: 'success',
      duration: 2000,
      placement: 'bottom',
      icon: <Icon name='checkmark-circle-sharp' size={20} color={APP_WHITE} />
    })

    navigation.goBack()
  }

  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return null
  }


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setEditHabit(null)
              navigation.goBack()
            }}>
            <Icon name='close' size={25} color={APP_RED} />
          </TouchableOpacity>
          <Text style={styles.headerText}>New <Text
            style={{ ...styles.headerText, color: '#9D9797' }}> Habit</Text></Text>
        </View>
        <View>
          <CustomTextInput bigLabel='Name' placeholder='Enter the name'
                           handleChange={setName}
                           handleBlur={() => {
                           }}
                           value={name}
          />
          <CustomTextInput bigLabel='Description' placeholder='Enter the description'
                           handleChange={setDescription}
                           handleBlur={() => {
                           }}
                           value={description}
          />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How often do you want to do it?</Text>
            <View style={styles.frequencyOptions}>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  marginRight: 15,
                  backgroundColor: frequencyOption === Frequency.Daily ? APP_BLACK : APP_GRAY
                }}
                onPress={() => setFrequencyOption(Frequency.Daily)}>
                <Text style={{
                  ...styles.frequencyOptionTitle,
                  color: frequencyOption === Frequency.Daily ? APP_WHITE : APP_BLACK
                }}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  backgroundColor: frequencyOption === Frequency.Weekly ? APP_BLACK : APP_GRAY
                }}
                onPress={() => setFrequencyOption(Frequency.Weekly)}>
                <Text style={{
                  ...styles.frequencyOptionTitle,
                  color: frequencyOption === Frequency.Weekly ? APP_WHITE : APP_BLACK
                }}>Weekly</Text>
              </TouchableOpacity>

            </View>
          </View>
          {/*<View style={styles.sectionContainer}>*/}
          {/*  <Text style={styles.sectionTitle}>Every?</Text>*/}
          {/*  <View style={styles.everyOption}>*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{*/}
          {/*        ...styles.frequencyOption,*/}
          {/*        width: 35,*/}
          {/*        height: 35*/}
          {/*      }}*/}
          {/*      onPress={() => setFrequencyOption('daily')}><Icon name='remove-outline' size={20} color={APP_BLACK} />*/}
          {/*    </TouchableOpacity>*/}

          {/*    <Text style={{ marginRight: 10, marginLeft: 10 }}>1 week</Text>*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{*/}
          {/*        ...styles.frequencyOption,*/}
          {/*        backgroundColor: APP_BLACK,*/}
          {/*        width: 35,*/}
          {/*        height: 35*/}
          {/*      }}*/}
          {/*      onPress={() => setFrequencyOption('daily')}><Icon name='ios-add-sharp' size={20} color={APP_WHITE} />*/}
          {/*    </TouchableOpacity>*/}

          {/*  </View>*/}
          {/*</View>*/}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>In which time of the day would you like to do it?</Text>
            <View style={styles.periodContainer}>
              <TouchableOpacity
                style={{
                  ...styles.periodOption,
                  backgroundColor: timeOfDay === TimeOfDay.Morning ? APP_BLUE : APP_GRAY
                }}
                onPress={() => setTimeOfDay(TimeOfDay.Morning)}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/sunrise1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === TimeOfDay.Morning ? APP_WHITE : APP_BLACK
                }}>Morning</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.periodOption,
                  backgroundColor: timeOfDay === TimeOfDay.Afternoon ? APP_BLUE : APP_GRAY
                }}
                onPress={() => setTimeOfDay(TimeOfDay.Afternoon)}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/sun1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === TimeOfDay.Afternoon ? APP_WHITE : APP_BLACK
                }}>Afternoon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.periodOption,
                  backgroundColor: timeOfDay === TimeOfDay.Evening ? APP_BLUE : APP_GRAY
                }}
                onPress={() => setTimeOfDay(TimeOfDay.Evening)}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/crescent-moon1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === TimeOfDay.Evening ? APP_WHITE : APP_BLACK
                }}>Evening</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10
              }}>
              <Text style={styles.sectionTitle}>Should we remind you?</Text>
              <CustomSwitch isEnabled={isEnabled}
                            toggleSwitch={toggleSwitch}
                            thumbEnabledColor={APP_WHITE}
                            thumbNonEnabledColor={APP_WHITE}
                            falseTrackColor={APP_WHITE}
                            trueTrackColor={MAIN_ACCENT_COLOR}
                            iosBackgroundColor={APP_GRAY}
              />
            </View>
            {isEnabled && <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('custom time')}>
                <Text style={styles.periodOptionTitle}>Custom</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('6:00pm')}>
                <Text style={styles.periodOptionTitle}>6:00pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('6:30pm')}>
                <Text style={styles.periodOptionTitle}>6:30pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('7:00pm')}>
                <Text style={styles.periodOptionTitle}>7:00pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('7:30pm')}>
                <Text style={styles.periodOptionTitle}>7:30pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('8:00pm')}>
                <Text style={styles.periodOptionTitle}>8:00pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('8:30pm')}>
                <Text style={styles.periodOptionTitle}>8:30pm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reminderTime}
                onPress={() => console.log('9:00pm')}>
                <Text style={styles.periodOptionTitle}>9:00pm</Text>
              </TouchableOpacity>

            </View>}
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={createHabit}>
          <Text style={styles.createButtonText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F3F3',
    flex: 1
  },
  container: {
    padding: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  closeButton: {
    marginRight: 40,
    backgroundColor: APP_PINK,
    borderRadius: 6,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    lineHeight: 36,
    color: APP_BLACK,
    display: 'flex'
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: GRAY_TEXT,
    marginBottom: 10
  },
  frequencyOptions: {
    display: 'flex',
    flexDirection: 'row'

  },
  frequencyOption: {
    backgroundColor: APP_GRAY,
    borderRadius: 6,
    width: 80,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  frequencyOptionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: GRAY_TEXT
  },
  everyOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  periodContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  periodOption: {
    backgroundColor: APP_GRAY,
    borderRadius: 10,
    width: 110,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  periodOptionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: GRAY_TEXT
  },
  reminderContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  reminderTime: {
    backgroundColor: APP_GRAY,
    borderRadius: 5,
    width: 80,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  createButton: {
    backgroundColor: MAIN_ACCENT_COLOR,
    borderRadius: 8,
    color: APP_WHITE,
    padding: 15
  },
  createButtonText: {
    fontFamily: 'Inter_700Bold',
    color: APP_WHITE,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center'

  }
})
