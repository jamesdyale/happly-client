import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { CustomSwitch, CustomTextInput } from '../../../../components'
import {
  APP_BLACK,
  APP_BLUE,
  APP_GRAY,
  APP_PINK,
  APP_RED,
  APP_WHITE,
  MAIN_ACCENT_COLOR,
  MAIN_BG_COLOR
} from '../../../../styles'
import Icon from 'react-native-vector-icons/Ionicons'


export const AddHabit = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = React.useState(true)
  const [frequencyOption, setFrequencyOption] = React.useState('daily')
  const [dayOfTheWeek, setDayOfTheWeek] = React.useState([])
  const [timeOfDay, setTimeOfDay] = React.useState('night')

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon name='close' size={25} color={APP_RED} />
          </TouchableOpacity>
          <Text style={styles.headerText}>New <Text
            style={{ ...styles.headerText, color: '#9D9797' }}> Habit</Text></Text>
        </View>
        <View>
          <CustomTextInput bigLabel='Title' placeholder='Enter the title' />
          <CustomTextInput bigLabel='Description' placeholder='Enter the description' />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How often do you want to do it?</Text>
            <View style={styles.frequencyOptions}>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  marginRight: 15,
                  backgroundColor: frequencyOption === 'daily' ? APP_BLACK : APP_GRAY
                }}
                onPress={() => setFrequencyOption('daily')}>
                <Text style={{
                  ...styles.frequencyOptionTitle,
                  color: frequencyOption === 'daily' ? APP_WHITE : APP_BLACK
                }}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  backgroundColor: frequencyOption === 'weekly' ? APP_BLACK : APP_GRAY
                }}
                onPress={() => setFrequencyOption('weekly')}>
                <Text style={{
                  ...styles.frequencyOptionTitle,
                  color: frequencyOption === 'weekly' ? APP_WHITE : APP_BLACK
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
                style={{ ...styles.periodOption, backgroundColor: timeOfDay === 'morning' ? APP_BLUE : APP_GRAY }}
                onPress={() => setTimeOfDay('morning')}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/sunrise1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === 'morning' ? APP_WHITE : APP_BLACK
                }}>Morning</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.periodOption, backgroundColor: timeOfDay === 'afternoon' ? APP_BLUE : APP_GRAY }}
                onPress={() => setTimeOfDay('afternoon')}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/sun1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === 'afternoon' ? APP_WHITE : APP_BLACK
                }}>Afternoon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.periodOption, backgroundColor: timeOfDay === 'night' ? APP_BLUE : APP_GRAY }}
                onPress={() => setTimeOfDay('night')}>
                <Image style={{
                  width: 15,
                  height: 15,
                  marginRight: 8
                }} source={require('../../../../assets/svgs/crescent-moon1.png')} />
                <Text style={{
                  ...styles.periodOptionTitle,
                  color: timeOfDay === 'night' ? APP_WHITE : APP_BLACK
                }}>Night</Text>
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
          onPress={() => console.log('Hey there')}>
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
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    color: APP_BLACK,
    display: 'flex'
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: '#333333',
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
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: '#333333'
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
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: '#333333'
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
    color: APP_WHITE,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center'

  }
})