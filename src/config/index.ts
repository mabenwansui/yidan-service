// const prefix = 'mongodb://127.0.0.1:27017'
const prefix = 'mongodb://mongo1:27017,mongo2:27019'

const config = {
  corsOrigin: 'https://localhost:3000',
  domain: 'localhost',
  port: 4000,
  dbs: [
    {
      uri: `${prefix}/yidian?replicaSet=rs0`
    }
  ]
}

export default config
