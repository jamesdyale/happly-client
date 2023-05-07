import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomCalendar } from '../../../../components'
import { APP_GRAY, APP_RED, APP_WHITE, GRAY_TEXT, HABIT_OPTION, MAIN_ACCENT_COLOR } from '../../../../styles'
import Icon from 'react-native-vector-icons/Ionicons'


export const SingleHabit = ({ route, navigation }) => {
  const { habitId } = route.params
  console.log(habitId)

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name='chevron-back-outline' size={25} color={HABIT_OPTION} onPress={() => navigation.goBack()} />

          <View style={styles.headerOptions}>
            <Icon name='create-outline' size={25} color={HABIT_OPTION}
                  onPress={() => console.log('Hey there editing')} />
            <Icon name='pause-outline' size={25} color={HABIT_OPTION}
                  onPress={() => console.log('Hey there pausing')} />
            <Icon name='trash-outline' size={25} color={HABIT_OPTION}
                  onPress={() => console.log('Hey there deleting')} />
          </View>
        </View>

        <Text style={styles.habitName}>Read a book</Text>
        <Text style={styles.habitDescription}>I want to read 10 pages of a book everyday.</Text>

        <View>
          <View>
            <Text>Repeat:</Text>
            <Text>Daily</Text>
          </View>
          <View>
            <Text>Remind:</Text>
            <Text>01:30 PM</Text>
          </View>
        </View>

        <View>
          <CustomCalendar />
        </View>
        <View>
          <View>
            <View>
              <Text>0 DAYS</Text>
              <Text>Your Current Streak</Text>
            </View>
            <View>
              <Text>0 days</Text>
              <Text>Your longest streak</Text>
            </View>
          </View>
          <View>
            <Text>Image</Text>
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
    backgroundColor: APP_WHITE,
    flex: 1
  },
  container: {
    padding: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  headerOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100
  },
  habitName: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    color: GRAY_TEXT
  },
  habitDescription: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: GRAY_TEXT
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