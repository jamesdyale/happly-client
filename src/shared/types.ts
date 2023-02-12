import { KeyboardTypeOptions } from 'react-native'


/**
 * Type for my custom text input
 */
export type CustomTextInputType = {
  label: string;
  handleChange: (e) => void;
  value: string;
  placeholder?: string;
  keyboardType: KeyboardTypeOptions;
}

/**
 * Type for custom button
 */
export type ButtonType = {
  icon?: any,
  bgColor: string,
  color: string,
  text: string,
  onClick: (e) => void
}

/**
 * Type for custom switch
 */
export type ICustomSwitchType = {
  isEnabled: boolean,
  toggleSwitch: () => void,
  thumbEnabledColor: string,
  thumbNonEnabledColor: string,
  falseTrackColor: string,
  trueTrackColor: string,
  iosBackgroundColor: string,
}

export type ProgressBarType = {
  progress: number
}

export type WeeklyCalendarDateType = {
  day: string,
  date: Date,
  isToday: boolean
}