module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
      ],
      '@babel/plugin-proposal-export-namespace-from',
      ['react-native-reanimated/plugin', {
        relativeSourceLocation: true
      }]
    ]
  }
}
