import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { APP_GRAY, APP_GREEN, APP_WHITE } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSetAtom } from 'jotai'
import { useSetSelectedHabitAtom } from '../../state/state'
import { DailyHabitType } from '../../shared'

type SingleHabitType = {
  habit: DailyHabitType;
}

export const SingleHabit = ({ habit }: SingleHabitType) => {
  const setHabitSelected = useSetAtom(useSetSelectedHabitAtom)

  const handleHabitClick = (id: string) => {
    setHabitSelected(id)
  }

  return (
    <TouchableOpacity onPress={() => handleHabitClick(habit.id)} style={styles.container}>
      <View style={styles.habitNameContainer}>
        <Text style={styles.habitName}>{habit.title}</Text>
        <Text style={styles.habitInfo}>{habit.info}</Text>
      </View>
      <View style={styles.habitProgressContainer}>
        <View style={styles.habitProgress}>
          {habit.progress === 100 && (
            <View style={{
              width: 50,
              backgroundColor: 'white',
              borderRadius: 50
            }}>
              <Icon style={{
                marginTop: -9,
                marginLeft: -5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
                    name='checkmark-circle' size={63} color={APP_GREEN} />
            </View>
          )}
          {habit.progress !== 100 && (
            <View style={styles.habitProgressInner} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: APP_GRAY,
    borderRadius: 10,
    marginBottom: 20,
    padding: 20
  },
  habitNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5
  },
  habitProgressContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  habitInfo: {
    backgroundColor: APP_GRAY,
    fontSize: 10,
    lineHeight: 12
  },
  habitProgress: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: APP_GREEN,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  habitProgressInner: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: APP_WHITE
  }

})