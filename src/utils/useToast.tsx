import { useToast as useToastFn } from 'react-native-toast-notifications'
import Icon from 'react-native-vector-icons/Ionicons'
import { APP_WHITE } from '@styles/colors'
import React from 'react'

export const useToast = ({ message, type, icon }) => {
  const toast = useToastFn()
  toast.show(message, {
    type: type,
    duration: 4000,
    placement: 'bottom',
    icon: <Icon name={icon} size={20} color={APP_WHITE} />
  })
}
