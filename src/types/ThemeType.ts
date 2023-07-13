import { calendarColors, sharedColors } from '~constants'

export type ColorTheme = {
  MAIN_BG_COLOR: string;
  SECONDARY_BG_COLOR: string;
  MAIN_ACCENT_COLOR: string;
  APP_GRAY: string;
  APP_LIGHT_GRAY: string;
  APP_GREEN: string;
  NAV_ICON_COLOR: string;
  APP_BLACK: string;
  APP_WHITE: string;
  APP_BLUE: string;
  APP_GOLD: string;
  HABIT_OPTION: string;
  APP_RED: string;
  APP_PINK: string;
  GRAY_TEXT: string;
  MAIN_TEXT: string;
  CONTRAST_MAIN_TEXT: string;
  DISABLED_BUTTON: string;
  BORDER_COLOR: string;
  LIGHT_MAIN_TEXT: string;
  INPUT_BG: string;
};

export type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

type SharedColors = typeof sharedColors;
type CalendarColors = typeof calendarColors;

export type TColors = ColorTheme & SharedColors & CalendarColors;
