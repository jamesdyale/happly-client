import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomCalendar } from '../../../../components'
import { APP_WHITE, GRAY_TEXT, HABIT_OPTION, MAIN_ACCENT_COLOR } from '@styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { StreakIcon } from '@assets/svgs'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { FIREBASE_DB } from '@db/firebaseConfig'
import { ROUTES } from '../../../../constants'
import { useSetAtom } from 'jotai'
import { editHabitAtom, selectedHabitAtom, showDeleteModalAtom } from '@state/state'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Habit } from '../../../../types/Habit'
import { Stats } from '../../../../types/Stats'
import { generateStatsId } from '../../../../generators/generateId'
import { useToast } from 'react-native-toast-notifications'


export const SingleHabitScreen = ({ route, navigation }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const toast = useToast()

  const { habitId } = route.params
  const currentDate = new Date().toISOString().split('T')[0]
  const setSelectedHabit = useSetAtom(selectedHabitAtom)
  const setEditHabit = useSetAtom(editHabitAtom)
  const setDeleteModal = useSetAtom(showDeleteModalAtom)

  const [habit, setHabit] = useState<Habit | null>(null)
  const [streak, setStreak] = useState<Stats[] | null>(null)

  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    if (isMounted) {
      getHabitId()
      getHabitStreak()
    }

    return () => {
      isMounted = false
    }

  }, [])

  const getHabitId = async () => {
    const dataDocumentSnapshot = await getDoc(doc(FIREBASE_DB, 'habits', habitId))
    const data = dataDocumentSnapshot.data() as unknown as Habit

    if (data) {
      setHabit(data)
    }
  }

  // TODO: function to get habit streak from habitId for the entire month
  const getHabitStreak = async () => {
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        where('habitId', '==', habitId)
      )
    )

    const progress: Stats[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Stats
        progress.push(data)
      }
    )

    setStreak(progress.filter((stat) =>
      new Date(stat.completedAt).getMonth() + 1 === new Date(currentDate).getMonth() + 1))
  }


  const handleOnPressEdit = () => {
    setEditHabit(habit)
    setSelectedHabit(null)
    navigate(ROUTES.CREATE_HABIT)
  }

  const handleOnPressPause = () => {
    console.log('Hey there pausing')
  }

  const handleOnPressDelete = () => {
    setDeleteModal(true)
  }

  const handleOnPressMarkAsDone = async () => {
    const docs = await getDocs(
      query(
        collection(FIREBASE_DB, 'stats'),
        where('habitId', '==', habitId)
      )
    )

    if (docs.empty) {
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
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name='chevron-back-outline'
                size={25}
                color={HABIT_OPTION}
                onPress={() => navigation.goBack()}
          />

          <View style={styles.headerOptions}>
            <Icon name='create-outline' size={25} color={HABIT_OPTION}
                  onPress={handleOnPressEdit} />
            <Icon name='pause-outline' size={25} color={HABIT_OPTION}
                  onPress={handleOnPressPause} />
            <Icon name='trash-outline' size={25} color={HABIT_OPTION}
                  onPress={handleOnPressDelete} />
          </View>
        </View>

        <Text style={styles.habitName}>{habit?.name}</Text>
        <Text style={styles.habitDescription}>{habit?.description}</Text>

        <View style={styles.habitInfo}>
          <View>
            <Text style={styles.habitInfoText}>Repeat:</Text>
            <Text style={styles.habitInfoText_Frequency}>{habit?.frequencyOption}</Text>
          </View>
          <View>
            <Text style={styles.habitInfoText}>Remind:</Text>
            {/* TODO: Add reminder logic here */}
            <Text style={styles.habitInfoText_Frequency}>01:30 PM</Text>
          </View>
        </View>

        <CustomCalendar currentDate={currentDate} streak={streak} />

        <View style={styles.streakContainer}>
          <View style={styles.streakVSLongestStreak}>
            <View>
              <Text style={styles.streakDay}>{streak?.length} DAYS</Text>
              <Text style={styles.streakLabel}>Your Current Streak</Text>
            </View>
            <View>
              {/* TODO: Fixing longest streak logic */}
              <Text style={styles.longestStreak}>{streak?.length} days</Text>
              <Text style={styles.longestStreakLabel}>Your longest streak</Text>
            </View>
          </View>
          <View>
            <StreakIcon />
          </View>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleOnPressMarkAsDone}>
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
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 29,
    color: GRAY_TEXT,
    marginBottom: 10
  },
  habitDescription: {
    fontFamily: 'Inter_500Medium',
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
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: GRAY_TEXT,
    textAlign: 'center',
    marginBottom: 5
  },
  habitInfoText_Frequency: {
    fontFamily: 'Inter_700Bold',
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
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 48,
    color: MAIN_ACCENT_COLOR
  },
  streakLabel: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: MAIN_ACCENT_COLOR,
    opacity: 0.7
  },
  longestStreak: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: MAIN_ACCENT_COLOR
  },
  longestStreakLabel: {
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 10
  }
})
