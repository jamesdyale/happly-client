import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import moment from 'moment'
import { useAtom } from 'jotai'
import { DayOfTheWeek } from './DayOfTheWeek'
import { selectedDayOfTheWeekAtom } from '~state'
import { getWeekFromCurrentDate } from '~utils'

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
        // swipe left
        setDaysTillCurrent((prev) => prev + 7)
        setWeek(getWeekFromCurrentDate(moment().add(daysTillCurrent + 1, 'days')))
      } else {
        // swipe right
        setDaysTillCurrent((prev) => prev - 7)
        setWeek(getWeekFromCurrentDate(moment().add(daysTillCurrent - 1, 'days')))
      }

      setTimeout(() => {
        setAllowSwipe(true)
      }, 1000)
    }

  }

  console.log('daysTillCurrent', daysTillCurrent)
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
