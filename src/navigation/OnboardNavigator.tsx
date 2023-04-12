import { AuthScreen, WelcomeScreen } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='AuthScreen' component={AuthScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}