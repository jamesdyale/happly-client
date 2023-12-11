import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useAuth, useCachedResources, useTheme } from "~hooks";

SplashScreen.preventAutoHideAsync();

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources();
  const { isUserOnboarded, isAppReady, user } = useAuth();
  const { isThemeReady } = useTheme();

  useEffect(() => {
    if (isLoadingComplete && isAppReady && isThemeReady) {
      if (isUserOnboarded && user) {
        SplashScreen.hideAsync();
      } else {
        SplashScreen.hideAsync();
      }
    }
  }, [isLoadingComplete, isAppReady, isUserOnboarded, isThemeReady]);

  if (!isLoadingComplete || !isAppReady || !isThemeReady) {
    return null;
  }

  return <>{children}</>;
};
