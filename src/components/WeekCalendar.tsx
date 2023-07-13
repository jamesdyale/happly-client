import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import moment from 'moment'
import { useAtom } from 'jotai'
import { DayOfTheWeek } from './DayOfTheWeek'
import { selectedDayOfTheWeekAtom } from '~state'
import { getWeekFromCurrentDate } from '~utils'
import { getCurrentDayOfNewWeek } from '~utils/getCurrentDayOfNewWeek'

// make this into a reusable library
export const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useAtom(selectedDayOfTheWeekAtom)
  const [daysTillCurrent, setDaysTillCurrent] = useState(0)
  const [week, setWeek] = useState(getWeekFromCurrentDate(moment()))

  const [allowSwipe, setAllowSwipe] = useState(true)


  const handleDayClick = async (day: string) => {
    setSelectedDay(day)
  }

  const handleSwipe = (event) => {
    if (allowSwipe) {
      setAllowSwipe(false)

      if (event.nativeEvent.translationX < 0) {
        // FIXME: This is not well refined and sometimes the dates are still wrong
        // FIXME: Also this need to work with the animation
        // swipe left
        setDaysTillCurrent((prev) => prev + 7)
        const addToWeek = moment().add(daysTillCurrent + 1, 'days')
        setWeek(getWeekFromCurrentDate(addToWeek))
        setSelectedDay(getCurrentDayOfNewWeek(addToWeek, selectedDay))
      } else {
        // swipe right
        setDaysTillCurrent((prev) => prev - 7)
        const addToWeek = moment().add(daysTillCurrent - 1, 'days')
        setWeek(getWeekFromCurrentDate(addToWeek))
        setSelectedDay(getCurrentDayOfNewWeek(addToWeek, selectedDay))
      }

      // TODO: Lock while animation is happening
      setTimeout(() => {
        setAllowSwipe(true)
      }, 1000)
    }
  }

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={styles.container}>
        {week.map((day) => {
          return (
            <DayOfTheWeek
              key={day.date.toString()}
              day={day}
              selectedDay={selectedDay}
              handleDayClick={handleDayClick}
            />
          )
        })}
      </View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  }
})
