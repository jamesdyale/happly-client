import { uniqueNamesGenerator, Config, names } from 'unique-names-generator'

const config: Config = {
  dictionaries: [names],
  style: 'capital'
}

export const randomNameGenerator = () =>
  `User_${uniqueNamesGenerator(config)}_${Math.floor(Math.random() * 1000)}`
