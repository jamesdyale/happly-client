import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DeleteHabitModal } from '../screen/Modals/DeleteHabitModal'

const Stack = createNativeStackNavigator()

export const CustomModalStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='DeleteHabitModal'>
      <Stack.Screen name='DeleteHabitModal' component={DeleteHabitModal} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}