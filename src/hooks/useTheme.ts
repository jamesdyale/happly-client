import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedThemeAtom, themeAtom } from "~state";
import { ASYNC_STORAGE_KEYS, Themes } from "~constants";
import { getData, storeData } from "~utils";
import Colors from "~constants/theme";
import { useSetAtom } from "jotai";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useAtom(themeAtom);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const setSelectedTheme = useSetAtom(selectedThemeAtom);

  useEffect(() => {
    let isMounted = true;

    async function getColorSchemeFromStorage() {
      try {
        const customColorScheme = await getData(
          ASYNC_STORAGE_KEYS.COLOR_SCHEME
        );

        if (customColorScheme) {
          setTheme(customColorScheme === "dark" ? Colors.dark : Colors.light);
          setSelectedTheme(
            customColorScheme === "dark" ? Themes.DARK : Themes.LIGHT
          );
          return;
        }

        if (colorScheme) {
          await storeData(ASYNC_STORAGE_KEYS.COLOR_SCHEME, colorScheme);
          setTheme(colorScheme === "dark" ? Colors.dark : Colors.light);
          setSelectedTheme(colorScheme === "dark" ? Themes.DARK : Themes.LIGHT);
        } else {
          await storeData(ASYNC_STORAGE_KEYS.COLOR_SCHEME, "light");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (isMounted) {
      getColorSchemeFromStorage().then(() => {
        setIsThemeReady(true);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isThemeReady,
    theme
  };
};
