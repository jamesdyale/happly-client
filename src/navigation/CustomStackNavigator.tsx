import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import { Settings } from '@screen/Settings'
import { SingleHabitScreen } from '@screen/Habit'

const Stack = createNativeStackNavigator()

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.SINGLE_HABIT} component={SingleHabitScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
