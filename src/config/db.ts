const prefix = 'mongodb://127.0.0.1:27017'

export default {
  dbs: [
    {
      uri: `${prefix}/commodity`,
    },
  ],
  MongooseModuleOptions: MongooseModuleOptions()
}

function MongooseModuleOptions() {
  return {
    connectionFactory: (connection) => {
      connection.plugin((schema) => {
        schema.set('toJSON', {
          versionKey: false,
          transform: (doc, ret) => {
            console.log('ddd', doc, ret)
            const { _id, ...rest } = ret
            return {
              id: _id,
              ...rest,
            }
          },
        })
      })
      return connection
    },
  }
}
