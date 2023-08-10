import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { selectedThemeAtom, themeAtom } from '~state'
import { ASYNC_STORAGE_KEYS, Themes } from '~constants'
import { getData, storeData } from '~utils'
import Colors from '~constants/theme'
import { useSetAtom } from 'jotai'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const [isThemeReady, setIsThemeReady] = useState(false)
  const setSelectedTheme = useSetAtom(selectedThemeAtom)

  useEffect(() => {
    let isMounted = true

    async function getColorSchemeFromStorage() {
      try {
        const colorScheme = await getData(ASYNC_STORAGE_KEYS.COLOR_SCHEME)
        if (colorScheme) {
          setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light)
          setSelectedTheme(colorScheme === 'dark' ? Themes.DARK : Themes.LIGHT)
        } else {
          await storeData(ASYNC_STORAGE_KEYS.COLOR_SCHEME, 'light')
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (isMounted) {
      getColorSchemeFromStorage().then(() => {
        setIsThemeReady(true)
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return {
    isThemeReady,
    theme
  }
}
