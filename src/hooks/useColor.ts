import { useAtom, useAtomValue } from 'jotai'
import { themeAtom } from '~state'

export const useColor = () => {
  const theme = useAtom(themeAtom)

  if (!theme) {
    throw new Error('useColor must be used within a ThemeProvider')
  }

  return {
    colors: theme
  }
}
