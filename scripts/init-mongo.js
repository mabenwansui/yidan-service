setTimeout(() => {
  rs.initiate({
    _id: 'rs0',
    members: [
      { _id: 0, host: 'mongodb:27017' },
      { _id: 1, host: 'mongodb-secondary:27017' }
    ]
  })
}, 3000)
