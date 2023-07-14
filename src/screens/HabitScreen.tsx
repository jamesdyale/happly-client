import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomButton, CustomCalendar } from '~components'
import Icon from 'react-native-vector-icons/Ionicons'
import { StreakIcon } from '~assets'
import { ROUTES } from '../constants'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { editHabitAtom, selectedDayOfTheWeekAtom, selectedHabitAtom, showDeleteModalAtom } from '~state'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Frequency, Habit, Stats, Streak } from '~types'
import { generateStatId } from '~generators/generateId'
import {
  ActionCreateStat,
  ActionGetStatsByHabitId,
  ActionGetStreakByHabitId,
  ActionGetUserHabitByIdDoc, ActionUpdateStreak
} from '~actions'
import { useToast } from 'react-native-toast-notifications'
import { DeleteHabitModal } from '~modals'
import { onSnapshot } from 'firebase/firestore'
import { findClosestReminder } from '~utils/timeUtils'
import { DateData } from 'react-native-calendars'
import moment from 'moment'
import { calculateLowestDifferenceInDays } from '~utils'
import { useTheme } from '~hooks'


export const HabitScreen = ({ route, navigation }) => {
  const toast = useToast()
  const { theme } = useTheme()
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const currentDate = moment().format('YYYY-MM-DD')
  const [selectedHabit, setSelectedHabit] = useAtom(selectedHabitAtom)
  const setEditHabit = useSetAtom(editHabitAtom)
  const [, setDeleteModal] = useAtom(showDeleteModalAtom)
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)

  const [habit, setHabit] = useState<Habit | null>(null)
  const [stats, setStats] = useState<Stats[] | null>([])
  const [streak, setStreak] = useState<Streak | null>(null)


  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    let currentMonth = moment(currentDate).month() + 1

    if (isMounted) {
      getHabitById()
      getHabitStats(currentMonth)
      getHabitStreak()
    }

    return () => {
      isMounted = false
      setSelectedHabit(null)
      setDeleteModal(false)
    }

  }, [])

  const getHabitById = async () => {
    const dataDocumentSnapshot = ActionGetUserHabitByIdDoc(selectedHabit.id)

    const subscription = onSnapshot(dataDocumentSnapshot, (doc) => {
      if (!doc.exists) {
        return
      }

      const data = doc.data() as unknown as Habit

      if (data) {
        setHabit(data)
      }
    })

    return () => subscription()
  }

  const handleMonthChange = async (month: DateData) => {
    await getHabitStats(month.month)
  }


  const getHabitStats = async (currentMonth) => {
    const docs = await ActionGetStatsByHabitId(selectedHabit.id)
    if (!docs) return

    const progress: Stats[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Stats
        progress.push(data)
      }
    )

    setStats(progress.filter((stat) =>
      new Date(stat.completedAt).getMonth() + 1 === currentMonth))
  }

  const getHabitStreak = async () => {
    const docs = await ActionGetStreakByHabitId(selectedHabit.id)

    if (!docs) return

    const streak: Streak[] = []
    docs.forEach((doc) => {
        const data = doc.data() as unknown as Streak
        streak.push(data)
      }
    )

    const currentStreak = streak[0]

    if (moment(currentStreak.lastUpdated).format('YYYY-MM-DD') === currentDate) {
      setStreak(currentStreak)
      return
    }

    if (selectedHabit.frequencyOption === Frequency.Daily) {
      const validStats = stats.filter((stat) => {
        // TODO: optimize this better by query the DB not doing it manually
        if (moment(currentDate).isSame(stat.completedAt, 'day')
          || moment(currentDate).subtract(1, 'day').isSame(stat.completedAt, 'day')) {
          return stat
        } else {
          return null
        }
      })

      if (validStats.length === 0) {
        const newStreak: Streak = {
          ...currentStreak,
          count: 0
        }

        await ActionUpdateStreak(newStreak)

        setStreak(newStreak)
      } else {
        setStreak(currentStreak)
      }
    } else if (selectedHabit.frequencyOption === Frequency.Weekly) {
      const currentDay = moment(currentDate).format('dddd')

      const lowestDifference = calculateLowestDifferenceInDays(selectedHabit.selectedDays, currentDay)

      const lastEligibleDateToKeepStreakAlive = moment(currentDate).subtract(lowestDifference, 'day').format('MMMM Do YYYY')

      let isStreakValid = false

      if (currentStreak.lastUpdated === lastEligibleDateToKeepStreakAlive) {
        isStreakValid = true
      } else {
        const validStats = stats.filter((stat) => {
          const completedAtDate = moment(stat.completedAt).format('MMMM Do YYYY')
          if (completedAtDate === lastEligibleDateToKeepStreakAlive) {
            return stat
          } else {
            return null
          }
        })

        if (validStats.length > 0) {
          isStreakValid = true
        }
      }

      if (isStreakValid) {
        setStreak(currentStreak)
      } else {
        const newStreak: Streak = {
          ...currentStreak,
          count: 0
        }

        await ActionUpdateStreak(newStreak)

        setStreak(newStreak)
      }
    }
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
    setSelectedHabit(habit)
  }

  const handleOnPressMarkAsDone = async () => {
    const docs = await ActionGetStatsByHabitId(selectedHabit.id)

    if (!docs) return

    let existingStat = false
    // get stat for today
    docs.forEach((doc) => {
      const data = doc.data() as unknown as Stats
      if (data.completedAt === moment(selectedDay, 'MMMM Do YYYY').format('ddd MMM DD YYYY')) {
        existingStat = true
      }
    })

    if (!existingStat) {
      const stat = {
        id: generateStatId(),
        userId: habit.userId,
        habitId: habit.id,
        completedAt: new Date().toDateString(),
        progress: 100
      }

      try {
        await ActionCreateStat(stat)
        toast.show('Congratulations', {
          type: 'success',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='trending-up' size={20} color={theme.APP_WHITE} />
        })

      } catch (e) {
        toast.show('An error happened when completing your habit. Please try again!', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
          icon: <Icon name='alert-circle' size={20} color={theme.APP_WHITE} />
        })
      }
    }
  }


  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.MAIN_BG_COLOR }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name='chevron-back-outline'
                size={25}
                color={theme.HABIT_OPTION}
                onPress={() => {
                  navigation.goBack()
                }}
          />

          <View style={styles.headerOptions}>
            <Icon name='create-outline' size={25} color={theme.HABIT_OPTION}
                  onPress={handleOnPressEdit} />
            <Icon name='pause-outline' size={25} color={theme.HABIT_OPTION}
                  onPress={handleOnPressPause} />
            <Icon name='trash-outline' size={25} color={theme.HABIT_OPTION}
                  onPress={handleOnPressDelete} />
          </View>
        </View>

        <Text style={[styles.habitName, {
          color: theme.GRAY_TEXT
        }]}>{habit?.name}</Text>
        <Text style={[styles.habitDescription, {
          color: theme.GRAY_TEXT
        }]}>{habit?.description}</Text>

        <View style={styles.habitInfo}>
          <View>
            <Text style={[styles.habitInfoText, {
              color: theme.GRAY_TEXT
            }]}>Repeat:</Text>
            <Text style={[styles.habitInfoText_Frequency, {
              color: theme.GRAY_TEXT
            }]}>{habit?.frequencyOption}</Text>
          </View>
          <View>
            <Text style={[styles.habitInfoText, {
              color: theme.GRAY_TEXT
            }]}>Closest Remind:</Text>
            {/* TODO: Add reminder logic here */}
            <Text style={[styles.habitInfoText_Frequency, {
              color: theme.GRAY_TEXT
            }]}>
              {habit?.reminderAt.length > 0 && findClosestReminder(habit?.reminderAt)}
              {habit?.reminderAt.length < 1 && 'None'}
            </Text>
          </View>
        </View>

        <CustomCalendar currentDate={currentDate} stats={stats} handleMonthChange={handleMonthChange} />

        <View style={styles.streakContainer}>
          <View style={styles.streakVSLongestStreak}>
            <View>
              <Text style={[styles.streakDay, {
                color: theme.MAIN_ACCENT_COLOR
              }]}>{streak?.count} {streak?.count > 1 ? 'DAYS' : 'DAY'}</Text>
              <Text style={[styles.streakLabel, {
                color: theme.MAIN_ACCENT_COLOR
              }]}>Your Current Streak</Text>
            </View>
            <View>
              <Text
                style={[styles.longestStreak, {
                  color: theme.MAIN_ACCENT_COLOR
                }]}>{streak?.longestStreak} {streak?.longestStreak > 1 ? 'days' : 'day'}</Text>
              <Text style={[styles.longestStreakLabel, {
                color: theme.MAIN_ACCENT_COLOR
              }]}>Your longest streak</Text>
            </View>
          </View>
          <View>
            <StreakIcon />
          </View>
        </View>
        <CustomButton
          bgColor={theme.MAIN_ACCENT_COLOR}
          color={theme.CONTRAST_MAIN_TEXT_COLOR}
          text={'Mark as done'}
          onClick={handleOnPressMarkAsDone}
          icon={<Icon name='checkbox-outline' size={25} color={theme.APP_WHITE} />}
          // disabled={loading}
        />
      </View>

      <DeleteHabitModal />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
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
    marginBottom: 10
  },
  habitDescription: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18
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
    textAlign: 'center',
    marginBottom: 5
  },
  habitInfoText_Frequency: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
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
    lineHeight: 48
  },
  streakLabel: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    opacity: 0.7
  },
  longestStreak: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15
  },
  longestStreakLabel: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    opacity: 0.7
  }
})
