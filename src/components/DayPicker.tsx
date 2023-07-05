import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { APP_BLACK, APP_GRAY, APP_WHITE, HABIT_OPTION } from '~styles'
import { DayOfTheWeek } from '~types'

type DayPickerType = {
  selectedDays: string[];
  handleSelectDay: (day: string) => void;
}

export const DayPicker = ({ selectedDays, handleSelectDay }: DayPickerType) => {
  const days = Object.keys(DayOfTheWeek)

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.day,
            backgroundColor: selectedDays.includes(day) ? APP_BLACK : HABIT_OPTION,
            borderColor: selectedDays.includes(day) ? APP_BLACK : HABIT_OPTION
          }}
          onPress={() => handleSelectDay(day)}
        >
          <Text style={{ color: selectedDays.includes(day) ? APP_WHITE : APP_GRAY }}
          >{day.substring(0, 3)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: APP_GRAY,
    backgroundColor: APP_GRAY,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5
  },
  day: {
    borderColor: APP_BLACK,
    borderWidth: 1,
    borderRadius: 6,
    width: 50,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
