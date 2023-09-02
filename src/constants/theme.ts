import { ColorPalettes } from "~types";
import { APP_BLACK, APP_WHITE, MAIN_ACCENT_COLOR } from "~styles";

export enum ThemeType {
  Light = "light",
  Dark = "dark"
}

export const sharedColors = {
  APP_BLACK: "#000000",
  APP_WHITE: "#FFFFFF",
  APP_BLUE: "#082E67",
  APP_GOLD: "#EFDA45",
  APP_GREEN: "#4BAE4F",
  APP_LIGHT_GRAY: "#d0d0d0",
  APP_RED: "#F84A3E",
  APP_PINK: "#F5B6B1",
  GRAY_TEXT: "#333333",
  APP_GRAY: "#D9D9D9"
};

export const calendarColors = {
  TEXT_SECTION_TITLE_COLOR: "#b6c1cd",
  SELECTED_DAY_BACKGROUND_COLOR: "red",
  SELECTED_DAY_TEXT_COLOR: APP_WHITE,
  TODAY_TEXT_COLOR: APP_BLACK,
  DAY_TEXT_COLOR: "#2d4150",
  TEXT_DISABLED_COLOR: "#d9e1e8",
  DOT_COLOR: "#00adf5",
  ARROW_COLOR: MAIN_ACCENT_COLOR,
  MONTH_TEXT_COLOR: APP_BLACK
};

const Colors: ColorPalettes = {
  dark: {
    MAIN_BG_COLOR: "#1E1E1E", // Dark background color
    SECONDARY_BG_COLOR: "#2A2A2A", // Darker secondary background
    MAIN_ACCENT_COLOR: "#FFA400", // Brighter accent color
    NAV_ICON_COLOR: "#6C7A8B", // Slightly lighter icon color
    HABIT_OPTION: "#7E7E7E", // Darker habit option color
    HABIT_SCREEN_ACTION_ICON_COLOR: "#CCCCCC",
    MAIN_TEXT_COLOR: "#FFFFFF", // White text for dark mode
    MAIN_TEXT_COLOR_2: "#FFFFFF", // Lighter text color for dark mode
    CONTRAST_MAIN_TEXT_COLOR: "#000000", // Black text for dark mode
    DISABLED_BUTTON_COLOR: "#444444", // Darker disabled button color
    BORDER_COLOR: "#2C2C2C", // Darker border color
    LIGHT_MAIN_TEXT_COLOR: "#CCCCCC", // Lighter text color for dark mode
    INPUT_BG: "#313131", // Darker input background
    CARD_BG: "#404040", // Darker card background
    ...sharedColors,
    ...calendarColors,
    MONTH_TEXT_COLOR: APP_WHITE,
    DAY_TEXT_COLOR: APP_WHITE,
    TODAY_TEXT_COLOR: MAIN_ACCENT_COLOR
  },
  light: {
    MAIN_BG_COLOR: "#FDFCF9",
    SECONDARY_BG_COLOR: "#FFFFFF",
    MAIN_ACCENT_COLOR: "#ED9107",
    NAV_ICON_COLOR: "#9DB2CE",
    HABIT_OPTION: "#565454",
    HABIT_SCREEN_ACTION_ICON_COLOR: "#565454",
    MAIN_TEXT_COLOR: "#000000",
    MAIN_TEXT_COLOR_2: "#565454",
    CONTRAST_MAIN_TEXT_COLOR: "#FFFFFF",
    DISABLED_BUTTON_COLOR: "#DDDDDD",
    BORDER_COLOR: "#B0C1CB",
    LIGHT_MAIN_TEXT_COLOR: "#333333",
    INPUT_BG: "#FAFAFA",
    CARD_BG: "#F3F2ED",
    ...sharedColors,
    ...calendarColors
  }
};

export default Colors;
