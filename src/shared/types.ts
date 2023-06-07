import { KeyboardTypeOptions } from 'react-native'
import { Stats } from '../types/Stats'
import { Habit } from '../types/Habit'


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
  secureTextEntry?: boolean;
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
  progress: number,
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

export enum DayOfTheWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
}

export enum TimeOfDay {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening'
}

export enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
}
