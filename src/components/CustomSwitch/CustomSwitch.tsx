import { Switch } from 'react-native'
import React from 'react'
import { ICustomSwitchType } from '../../shared'

export const CustomSwitch = ({
                               isEnabled,
                               toggleSwitch,
                               thumbEnabledColor,
                               thumbNonEnabledColor,
                               falseTrackColor,
                               trueTrackColor,
                               iosBackgroundColor
                             }: ICustomSwitchType) => {
  return (
    <Switch
      trackColor={{ false: falseTrackColor, true: trueTrackColor }}
      thumbColor={isEnabled ? thumbEnabledColor : thumbNonEnabledColor}
      ios_backgroundColor={iosBackgroundColor}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  )
}