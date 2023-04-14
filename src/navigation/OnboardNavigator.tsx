import { AuthScreen, OnboardScreen } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='OnboardScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WelcomeScreen' component={OnboardScreen} />
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
    </Stack.Navigator>
  )
}