const prefix = 'mongodb://127.0.0.1:27017'

const config = {
  corsOrigin: 'https://127.0.0.1:3000',
  domain: '127.0.0.1',
  port: 4000,
  dbs: [
    {
      uri: `${prefix}/yidian`,
    },
  ],
}

export default config
