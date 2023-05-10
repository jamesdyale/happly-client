import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DeleteHabitModal, PauseHabitModal } from '../screen/Modals'

const Stack = createNativeStackNavigator()

export const CustomModalStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='PauseHabitModal'>
      <Stack.Screen name='DeleteHabitModal' component={DeleteHabitModal} options={{ headerShown: false }} />
      <Stack.Screen name='PauseHabitModal' component={PauseHabitModal} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}