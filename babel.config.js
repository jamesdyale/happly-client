module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        'envName': 'APP_ENV',
        'moduleName': '@env',
        'path': '.env'
      }],
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@constant': './src/constant',
            '@db': './src/db',
            '@navigation': './src/navigation',
            '@screen': './src/screen',
            '@shared': './src/shared',
            '@state': './src/state',
            '@styles': './src/styles',
            '@types': './src/types'
          }
        }
      ]
    ]
  }
}
