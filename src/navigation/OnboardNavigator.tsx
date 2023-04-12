import { WelcomeScreen } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={WelcomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}