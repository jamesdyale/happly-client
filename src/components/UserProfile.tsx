import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { useAtomValue } from 'jotai'
import { selectedDayOfTheWeekAtom, userAtom } from '~state'
import moment from 'moment/moment'
import { useTheme } from '~hooks'

export const UserProfile = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { theme } = useTheme()
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom)
  const monthNumber = moment(selectedDay, 'MMMM Do YYYY').month()
  const year = moment(selectedDay, 'MMMM Do YYYY').year()
  const month = moment.months(monthNumber)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <View style={styles.welcomeContainer}>
              <Text style={[styles.welcomeText, { color: theme.MAIN_TEXT_COLOR }]}>Welcome 👋</Text>
            </View>
          </View>
        </View>
        <View>
        </View>
        <TouchableOpacity onPress={() => navigate(ROUTES.CUSTOM_STACK, { screen: 'Settings' })}>
          <Icon name='settings' size={25} color={theme.MAIN_TEXT_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
        <Text style={[styles.monthAndYearText, {
          color: theme.HABIT_OPTION
        }]}>{month} {year}</Text>
      </View>

    </>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 5
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '58%'
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5
  },
  welcomeText: {
    fontFamily: 'Inter_700Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 24
  },
  monthAndYearText: {
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    opacity: 0.5,
    marginRight: 5
  }
})
