import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '~state'
import { ASYNC_STORAGE_KEYS } from '~constants'
import { getData } from '~utils'
import Colors from '~constants/theme'

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)
  const [isThemeReady, setIsThemeReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function getColorSchemeFromStorage() {
      try {
        const colorScheme = await getData(ASYNC_STORAGE_KEYS.COLOR_SCHEME)
        if (colorScheme) {
          setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light)
        } else {
          setTheme(Colors.dark)
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
