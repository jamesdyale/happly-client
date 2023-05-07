import { View, Text, Button, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CustomSwitch, CustomTextInput } from '../../../../components'
import { APP_BLACK, APP_GRAY, APP_PINK, APP_RED, APP_WHITE, MAIN_ACCENT_COLOR } from '../../../../styles'
import Icon from 'react-native-vector-icons/Ionicons'


export const AddHabit = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [frequencyOption, setFrequencyOption] = React.useState('daily')

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
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Every?</Text>
            <View style={styles.everyOption}>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  width: 35,
                  height: 35
                }}
                onPress={() => setFrequencyOption('daily')}><Icon name='remove-outline' size={20} color={APP_BLACK} />
              </TouchableOpacity>

              <Text style={{ marginRight: 10, marginLeft: 10 }}>1 week</Text>
              <TouchableOpacity
                style={{
                  ...styles.frequencyOption,
                  backgroundColor: APP_BLACK,
                  width: 35,
                  height: 35
                }}
                onPress={() => setFrequencyOption('daily')}><Icon name='ios-add-sharp' size={20} color={APP_WHITE} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>In which time of the day would you like to do it?</Text>
            <View style={styles.periodContainer}>
              <TouchableOpacity
                style={
                  styles.periodOption}
                onPress={() => setFrequencyOption('daily')}>
                <Text style={}>Morning</Text>
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
                }}>Afternoon</Text>
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
                }}>Evening</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Should we remind you?</Text>
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
    flexDirection: 'row'
  },
  periodOption: {
    backgroundColor: APP_GRAY,
    borderRadius: 6,
    width: 80,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

})