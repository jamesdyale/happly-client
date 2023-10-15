import React, { useRef, useState } from "react";
import { Provider as StateProvider } from "jotai";
import { ToastProvider } from "react-native-toast-notifications";
import { Navigation } from "~navigation";
import { AppLoading } from "~AppLoading";

const App = () => {
  // TODO: Bring in NativeBaseProvider for light mode dark mode - https://github.com/kacgrzes/expo-typescript-template/blob/981dc18e5a7df5ec3b9be0fd847cd6e0a01e4da2/src/index.tsx#L32
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
