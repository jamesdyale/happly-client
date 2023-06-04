import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  MainApp: undefined;
  AllHabits: undefined;
  CreateHabit: undefined;
  SingleHabit: undefined;
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
