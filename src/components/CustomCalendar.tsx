import { StyleSheet } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import React from 'react'
import { APP_GRAY } from '~styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Stats } from '~types'
import { useTheme } from '~hooks'

const Arrow = ({ direction }) => {
  return direction === 'left' ?
    <Icon name='chevron-back' size={22} color={APP_GRAY} /> : <Icon name='chevron-forward' size={22} color={APP_GRAY} />
}

type CustomCalendarType = {
  currentDate: string
  stats: Stats[] | null,
  handleMonthChange: (month: DateData) => void
}

export const CustomCalendar = ({ currentDate, stats, handleMonthChange }: CustomCalendarType) => {
  const { theme } = useTheme()
  const markedDates = stats?.reduce((acc, stat) => {
    acc[new Date(stat.completedAt).toISOString().split('T')[0]] = {
      selected: true,
      selectedColor: theme.MAIN_ACCENT_COLOR
    }
    return acc
  }, {})

  return (
    <Calendar
      // // Initially visible month. Default = Date()
      style={styles.calendar}
      current={currentDate}
      theme={
        {
          backgroundColor: theme.MAIN_BG_COLOR,
          calendarBackground: theme.MAIN_BG_COLOR,
          textSectionTitleColor: theme.TEXT_SECTION_TITLE_COLOR,
          selectedDayBackgroundColor: theme.SELECTED_DAY_BACKGROUND_COLOR,
          selectedDayTextColor: theme.SELECTED_DAY_TEXT_COLOR,
          todayTextColor: theme.TODAY_TEXT_COLOR,
          dayTextColor: theme.DAY_TEXT_COLOR,
          textDisabledColor: theme.TEXT_DISABLED_COLOR,
          dotColor: theme.DOT_COLOR,
          arrowColor: theme.ARROW_COLOR,
          monthTextColor: theme.MONTH_TEXT_COLOR,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textMonthFontWeight: '600',
          textDayHeaderFontSize: 15
        }
      }
      // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      // minDate={'2012-05-10'}
      // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      // maxDate={'2012-05-30'}
      // // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day)
      }}
      // // render a look for the marked dates
      markedDates={markedDates}
      // https://stackoverflow.com/questions/52090035/how-to-override-the-style-sheet-of-the-react-native-calendar
      // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      // monthFormat={'yyyy MM'}
      // // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => handleMonthChange(month)}
      // // Hide month navigation arrows. Default = false
      // Hide month navigation arrows. Default = false

      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) => (<Arrow direction={direction} />)}
      // // Do not show days of other months in month page. Default = false

      // hideExtraDays={true}
      // // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
      // // day from another month that is visible in calendar page. Default = false
      // disableMonthChange={true}
      // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={7}
      enableSwipeMonths={true}
    />
  )
}

const styles = StyleSheet.create({
  calendar: {}
})
