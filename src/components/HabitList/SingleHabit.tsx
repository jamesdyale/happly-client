import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { APP_BLACK, APP_GRAY, APP_GREEN, APP_WHITE } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSetAtom } from 'jotai'
import { useSetSelectedHabitAtom } from '../../state/state'
import { Habit } from '../../types/Habit'
import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { generateStatsId } from '../../generators/generateId'
import { useToast } from 'react-native-toast-notifications'
import { Stats } from '../../types/Stats'

type SingleHabitType = {
  habit: Habit;
  progress: Stats[];
}

export const SingleHabit = ({ habit, progress }: SingleHabitType) => {
  const setHabitSelected = useSetAtom(useSetSelectedHabitAtom)
  const toast = useToast()

  const foundProgress = progress.find((stat) => stat.habitId === habit.id)

  const handleHabitClick = () => {
    if (habit) {
      console.log(habit)
      // setHabitSelected(habit.id)
    }
  }

  const handleCompletedHabit = async () => {
    const stat = {
      id: generateStatsId(),
      userId: habit.userId,
      habitId: habit.id,
      completedAt: new Date().toDateString(),
      progress: 100
    }

    try {
      await setDoc(
        doc(FIREBASE_DB, 'stats', stat.id), stat
      )
      toast.show('Congratulations.', {
        type: 'success',
        duration: 4000,
        placement: 'bottom',
        icon: <Icon name='trending-up' size={20} color={APP_WHITE} />
      })
    } catch (e) {
      toast.show('An error happened when completing your habit. Please try again!', {
        type: 'danger',
        duration: 4000,
        placement: 'bottom',
        icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
      })
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHabitClick} style={styles.habitNameContainer}>
        <Text style={styles.habitName}>{habit.name}</Text>
        <Text style={styles.habitInfo}>{habit.description}</Text>
      </TouchableOpacity>
      <View style={styles.habitProgressContainer}>
        <View style={styles.habitProgress}>
          {foundProgress ? (
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
            ) :
            (
              <TouchableOpacity style={styles.habitProgressInner} onPress={handleCompletedHabit} />
            )}
        </View>
      </View>
    </View>
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
