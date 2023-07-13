import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSetAtom, useAtomValue } from 'jotai'
import { useToast } from 'react-native-toast-notifications'
import { Habit, Stats } from '~types'
import { progressAtom, selectedDayOfTheWeekAtom, selectedHabitAtom } from '~state'
import { ActionCreateOrUpdateStreak, ActionCreateStat } from '~actions'
import { APP_GRAY, APP_GREEN, APP_WHITE } from '~styles'
import { generateStatId } from '~generators/generateId'
import moment from 'moment'

type HabitCardType = {
  habit: Habit;
  progress: Stats[];
}

export const HabitCard = ({ habit, progress }: HabitCardType) => {
  const toast = useToast()

  const setHabitSelected = useSetAtom(selectedHabitAtom)
  const setProgress = useSetAtom(progressAtom)
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)
  const foundProgress = progress.find((stat) => stat.habitId === habit.id)

  const handleHabitClick = () => {
    if (habit) {
      setHabitSelected(habit)
    }
  }

  const handleCompletedHabit = async () => {
    const stat = {
      id: generateStatId(),
      userId: habit.userId,
      habitId: habit.id,
      completedAt: moment(selectedDay, 'MMMM Do YYYY').format('ddd MMM DD YYYY'),
      progress: 100
    }


    try {
      // TODO: check if it was successfully added to the database
      const createdStat = await ActionCreateStat(stat)

      if (!createdStat) {
        toast.show('An error happened when completing your habit. Please try again!', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='alert-circle' size={20} color={APP_WHITE} />
        })

        return
      }

      await ActionCreateOrUpdateStreak(habit.id, habit.userId)

      // TODO: Add logic to check the stats and update the habit accordingly
      setProgress((prev) => [...prev, stat])

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
    alignItems: 'flex-start',
    width: '80%'
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
