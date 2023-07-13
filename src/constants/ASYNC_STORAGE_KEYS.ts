export const ASYNC_STORAGE_KEYS = {
  NAVIGATION_STATE: '@navigation/navigation-state',
  // USER_LANGUAGE: '@language/user-language',
  COLOR_SCHEME: 'COLOR_SCHEME',
  // This value is used in `expo-secure-store` package and it can't include '@' and '/'
  USER_TOKEN: 'user_token',
  USER_INFO: 'user_info',
  ONBOARDED: 'ONBOARDED',
  USER_ID: 'USER_ID',
  USER_UUID: 'USER_UUID'
} as const
