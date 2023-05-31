import { AuthScreen, OnboardScreen, RecoveryScreen } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'

const Stack = createNativeStackNavigator()

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
      <Stack.Screen name={ROUTES.BENEFIT} component={OnboardScreen} />
      <Stack.Screen name={ROUTES.RECOVER_ACCOUNT} component={RecoveryScreen} />
    </Stack.Navigator>
  )
}
