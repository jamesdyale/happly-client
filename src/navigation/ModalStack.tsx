import "react-native-gesture-handler";
import { DeleteHabitModal, PauseHabitModal } from "~modals";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export const ModalStack = () => {
  return (
    <Navigator initialRouteName='PauseHabitModal'>
      <Screen
        name='DeleteHabitModal'
        component={DeleteHabitModal}
        options={{ headerShown: false }}
      />
      <Screen
        name='PauseHabitModal'
        component={PauseHabitModal}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
