import { AuthScreen, OnboardScreen, RecoveryScreen } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='RecoveryScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
      <Stack.Screen name='OnboardScreen' component={OnboardScreen} />
      <Stack.Screen name='RecoveryScreen' component={RecoveryScreen} />
    </Stack.Navigator>
  )
}