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
            '@actions': './src/actions',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constant': './src/constant',
            '@data': './src/data',
            '@navigation': './src/navigation',
            '@screen': './src/screen',
            '@shared': './src/shared',
            '@state': './src/state',
            '@styles': './src/styles',
            '@types': './src/types',
            '@utils': './src/utils'
          }
        }
      ]
    ]
  }
}
