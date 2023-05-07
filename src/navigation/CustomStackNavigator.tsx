import { Settings, SingleHabit } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'

const Stack = createNativeStackNavigator()

export const CustomStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.SINGLE_HABIT} component={SingleHabit} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}