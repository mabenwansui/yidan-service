const config = {
  corsOrigin: 'https://localhost:3000',
  domain: 'localhost',
  port: 4000,
  redis: {
    connection: {
      host: 'localhost',
      port: 6379,
    }    
  },
  mongo: `mongodb://mongo1:27017,mongo2:27019/yidian?replicaSet=rs0`
}

export default config
