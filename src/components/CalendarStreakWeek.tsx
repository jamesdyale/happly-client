import { StyleSheet, Text, View } from 'react-native'
import { onSnapshot } from 'firebase/firestore'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { User, WeeklyCalendarDateType } from '~types'
import { APP_GRAY, APP_WHITE, HABIT_OPTION, MAIN_ACCENT_COLOR } from '~styles'
import { Habit } from '~types'
import { useAtomValue } from 'jotai'
import { userAtom } from '~state'
import { ActionPollHabitStatsQuery } from '~actions'
import { getData } from '~utils'
import { ASYNC_STORAGE_KEYS } from '~constants'

interface IDayOfTheWeek {
  day: WeeklyCalendarDateType,
  habitId: Habit['id']
}

export const CalendarStreakWeek = (props: IDayOfTheWeek) => {
  const { day, habitId } = props
  const [isHighlighted, setIsHighlighted] = useState(false)
  const user = useAtomValue(userAtom)

  const [isLoading, setIsLoading] = useState(true)

  const getStat = async () => {
    const userId = await getData(ASYNC_STORAGE_KEYS.USER_ID) as User['id']

    if (!userId) {
      console.log('no user')
      return
    }
    
    const q = ActionPollHabitStatsQuery(
      habitId,
      userId,
      day.date
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().habitId === habitId) setIsHighlighted(true)
        })
      }
    )


    return () => unsubscribe()
  }

  useEffect(() => {
    // TODO: Add loading state
    let isMounted = true

    if (isMounted) {
      getStat()
        .then(
          () => {
            setIsLoading(false)
          }
        )
    }


  }, [])


  return (
    <View
      key={day.date.toString()}
      style={[styles.day,
        {
          backgroundColor: isHighlighted ? MAIN_ACCENT_COLOR : APP_WHITE,
          borderColor: isHighlighted ? MAIN_ACCENT_COLOR : APP_GRAY
        }]}
    >
      <Text style={[styles.dayText,
        {
          color: isHighlighted ? APP_WHITE : HABIT_OPTION
        }]}>
        {day.day}
      </Text>
      <Text style={[styles.dayNumber,
        {
          color: isHighlighted ? APP_WHITE : HABIT_OPTION
        }]}>{moment(day.date).format('DD')}</Text>
    </View>

  )
}


const styles = StyleSheet.create({
  day: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: APP_GRAY,
    padding: 13
  },
  dayText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: HABIT_OPTION
  },
  dayNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: HABIT_OPTION
  }
})
