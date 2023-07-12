import { ColorPalettes } from '~types'

export enum ThemeType {
  Light = 'light',
  Dark = 'dark'
}

export const sharedColors = {
  APP_BLACK: '#000000',
  APP_WHITE: '#FFFFFF',
  APP_BLUE: '#082E67',
  APP_GOLD: '#EFDA45',
  APP_GREEN: '#4BAE4F',
  APP_LIGHT_GRAY: '#d0d0d0',
  APP_RED: '#F84A3E',
  APP_PINK: '#F5B6B1',
  GRAY_TEXT: '#333333',
  APP_GRAY: '#D9D9D9'
}

const Colors: ColorPalettes = {
  dark: {
    MAIN_BG_COLOR: '#FDFCF9',
    SECONDARY_BG_COLOR: '#FFFFFF',
    MAIN_ACCENT_COLOR: '#ED9107',
    NAV_ICON_COLOR: '#9DB2CE',
    HABIT_OPTION: '#565454',
    ...sharedColors
  },
  light: {
    MAIN_BG_COLOR: '#FDFCF9',
    SECONDARY_BG_COLOR: '#FFFFFF',
    MAIN_ACCENT_COLOR: '#ED9107',
    NAV_ICON_COLOR: '#9DB2CE',
    HABIT_OPTION: '#565454',
    ...sharedColors
  }
}

export default Colors


