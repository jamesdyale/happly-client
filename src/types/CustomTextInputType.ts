import { KeyboardTypeOptions } from "react-native";

/**
 * Type for my custom text input
 */
export type CustomTextInputType = {
  label?: string;
  bigLabel?: string;
  handleChange: (e) => void;
  handleSubmit?: (e) => void;
  handleBlur?: (e) => void;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  error?: string;
  icon?: string;
};
