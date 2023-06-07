import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomCalendar } from '../../../../components'
import { APP_BLACK, APP_GRAY, APP_RED, APP_WHITE, GRAY_TEXT, HABIT_OPTION, MAIN_ACCENT_COLOR } from '../../../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { StreakIcon } from '../../../../assets/svgs'


export const SingleHabitScreen = ({ route, navigation }) => {
  const { habitId } = route.params
  const currentDate = new Date().toISOString().split('T')[0]

  // TODO: function to get habit from habitId

  // TODO: function to get habit streak from habitId for the entire month

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

        <View style={styles.habitInfo}>
          <View>
            <Text style={styles.habitInfoText}>Repeat:</Text>
            <Text style={styles.habitInfoText_Frequency}>Daily</Text>
          </View>
          <View>
            <Text style={styles.habitInfoText}>Remind:</Text>
            <Text style={styles.habitInfoText_Frequency}>01:30 PM</Text>
          </View>
        </View>

        <CustomCalendar currentDate={currentDate} />

        <View style={styles.streakContainer}>
          <View style={styles.streakVSLongestStreak}>
            <View>
              <Text style={styles.streakDay}>0 DAYS</Text>
              <Text style={styles.streakLabel}>Your Current Streak</Text>
            </View>
            <View>
              <Text style={styles.longestStreak}>0 days</Text>
              <Text style={styles.longestStreakLabel}>Your longest streak</Text>
            </View>
          </View>
          <View>
            <StreakIcon />
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => console.log('Hey there')}>
          <Icon name='checkbox-outline' size={25} color={APP_WHITE} />
          <Text style={styles.createButtonText}>Mark as done</Text>
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
    color: GRAY_TEXT,
    marginBottom: 10
  },
  habitDescription: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: GRAY_TEXT
  },
  habitInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    width: 200,
    alignSelf: 'center'
  },
  habitInfoText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: GRAY_TEXT,
    textAlign: 'center',
    marginBottom: 5
  },
  habitInfoText_Frequency: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    color: GRAY_TEXT,
    textAlign: 'center'
  },
  streakContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45,
    marginTop: 25,
    height: 130
  },
  streakVSLongestStreak: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  streakDay: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 48,
    color: MAIN_ACCENT_COLOR
  },
  streakLabel: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: MAIN_ACCENT_COLOR,
    opacity: 0.7
  },
  longestStreak: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: MAIN_ACCENT_COLOR
  },
  longestStreakLabel: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: MAIN_ACCENT_COLOR,
    opacity: 0.7
  },
  createButton: {
    backgroundColor: MAIN_ACCENT_COLOR,
    borderRadius: 8,
    color: APP_WHITE,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButtonText: {
    color: APP_WHITE,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 10
  }
})
