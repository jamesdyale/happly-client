import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { DayOfTheWeek } from '~types'
import { useTheme } from '~hooks'

type DayPickerType = {
  selectedDays: string[];
  handleSelectDay: (day: string) => void;
}

export const DayPicker = ({ selectedDays, handleSelectDay }: DayPickerType) => {
  const { theme } = useTheme()

  const days = Object.keys(DayOfTheWeek)

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.day,
            backgroundColor: selectedDays.includes(day) ? theme.APP_BLACK : theme.HABIT_OPTION,
            borderColor: selectedDays.includes(day) ? theme.APP_BLACK : theme.HABIT_OPTION
          }}
          onPress={() => handleSelectDay(day)}
        >
          <Text style={{ color: selectedDays.includes(day) ? theme.APP_WHITE : theme.APP_GRAY }}
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 5
  },
  day: {
    borderWidth: 1,
    borderRadius: 6,
    width: 50,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
