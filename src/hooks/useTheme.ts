import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { themeAtom } from '~state'
import { ASYNC_STORAGE_KEYS, ThemeType } from '~constants'
import { getData } from '~utils'
import Colors from '~constants/theme'

export const useTheme = () => {
  const setTheme = useSetAtom(themeAtom)
  const [isThemeReady, setIsThemeReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function getColorSchemeFromStorage() {
      try {
        const colorScheme = await getData(ASYNC_STORAGE_KEYS.COLOR_SCHEME)
        if (colorScheme) {
          setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light)
        } else {
          setTheme(Colors.light)
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
    isThemeReady
  }
}
