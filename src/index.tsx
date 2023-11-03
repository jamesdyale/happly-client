import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { Provider as StateProvider, useAtomValue, useSetAtom } from "jotai";
import { ToastProvider } from "react-native-toast-notifications";
import { Navigation } from "~navigation";
import { AppLoading } from "~AppLoading";
import { AppState } from "react-native";
import { selectedDayOfTheWeekAtom } from "~state";
import moment from "moment";

const App = () => {
  // TODO: Bring in NativeBaseProvider for light mode dark mode - https://github.com/kacgrzes/expo-typescript-template/blob/981dc18e5a7df5ec3b9be0fd847cd6e0a01e4da2/src/index.tsx#L32
  const appState = useRef(AppState.currentState);
  const setSelectedDay = useSetAtom(selectedDayOfTheWeekAtom);
  const selectedDay = useAtomValue(selectedDayOfTheWeekAtom);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === "active") {
        // set the selected day to the current day
        const currentDay = moment().format("MMMM Do YYYY");
        if (selectedDay !== currentDay) {
          setSelectedDay(currentDay);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <StateProvider>
      <ToastProvider placement='top' offsetTop={120} offsetBottom={120}>
        <AppLoading>
          <Navigation />
        </AppLoading>
      </ToastProvider>
    </StateProvider>
  );
};

export default App;
