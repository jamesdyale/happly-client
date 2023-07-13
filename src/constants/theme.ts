import { ColorPalettes } from '~types'
import { APP_BLACK, APP_WHITE, MAIN_ACCENT_COLOR } from '~styles'

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

export const calendarColors = {
  TEXT_SECTION_TITLE_COLOR: '#b6c1cd',
  SELECTED_DAY_BACKGROUND_COLOR: 'red',
  SELECTED_DAY_TEXT_COLOR: APP_WHITE,
  TODAY_TEXT_COLOR: APP_BLACK,
  DAY_TEXT_COLOR: '#2d4150',
  TEXT_DISABLED_COLOR: '#d9e1e8',
  DOT_COLOR: '#00adf5',
  ARROW_COLOR: MAIN_ACCENT_COLOR,
  MONTH_TEXT_COLOR: APP_BLACK
}

const Colors: ColorPalettes = {
  dark: {
    MAIN_BG_COLOR: '#FDFCF9',
    SECONDARY_BG_COLOR: '#FFFFFF',
    MAIN_ACCENT_COLOR: '#ED9107',
    NAV_ICON_COLOR: '#9DB2CE',
    HABIT_OPTION: '#565454',
    MAIN_TEXT: '#FFFFFF',
    CONTRAST_MAIN_TEXT: '#000000',
    DISABLED_BUTTON: '#DDDDDD',
    BORDER_COLOR: '#B0C1CB',
    LIGHT_MAIN_TEXT: '#333333',
    INPUT_BG: '#FAFAFA',
    ...sharedColors,
    ...calendarColors
  },
  light: {
    MAIN_BG_COLOR: '#FDFCF9',
    SECONDARY_BG_COLOR: '#FFFFFF',
    MAIN_ACCENT_COLOR: '#ED9107',
    NAV_ICON_COLOR: '#9DB2CE',
    HABIT_OPTION: '#565454',
    MAIN_TEXT: '#000000',
    CONTRAST_MAIN_TEXT: '#FFFFFF',
    DISABLED_BUTTON: '#DDDDDD',
    BORDER_COLOR: '#B0C1CB',
    LIGHT_MAIN_TEXT: '#333333',
    INPUT_BG: '#FAFAFA',
    ...sharedColors,
    ...calendarColors
  }
}

export default Colors


