import { KeyboardTypeOptions } from 'react-native'


/**
 * Type for my custom text input
 */
export type CustomTextInputType = {
  label?: string;
  bigLabel?: string;
  handleChange: (e) => void;
  handleBlur: (e) => void;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
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

export type HabitType = {
  id: string;
  title: string;
  description: string;
  frequency: string;
  dayOfTheWeek: string;
  timeOfDay: string;
  reminderOn: boolean;
  reminderAt: string;
  userId: string;
}

export type DailyHabitType = {
  id: string;
  habitId: string;
  title: string;
  description: string;
  reminderOn: boolean;
  reminderAt: string;
  progress: number;
  completed: boolean;
  info: string;
}

export type HabitsType = HabitType[];
