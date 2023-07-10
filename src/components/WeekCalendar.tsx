import { View, StyleSheet } from 'react-native'
import { DayOfTheWeek } from './DayOfTheWeek'
import { useAtom } from 'jotai'
import { selectedDayOfTheWeekAtom } from '~state'
import React from 'react'
import { getWeekFromCurrentDate } from '~utils'

// make this into a reusable library
export const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useAtom(selectedDayOfTheWeekAtom)

  const week = getWeekFromCurrentDate()

  const handleDayClick = async (day: Date) => {
    // setSelectedDay(day)
  }

  return (
    <View style={styles.container}>
      {/*{week.map((day) => {*/}
      {/*  return (*/}
      {/*    <DayOfTheWeek*/}
      {/*      key={day.date.toString()}*/}
      {/*      day={day}*/}
      {/*      selectedDay={selectedDay}*/}
      {/*      handleDayClick={handleDayClick}*/}
      {/*    />*/}
      {/*  )*/}
      {/*})}*/}
    </View>
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
