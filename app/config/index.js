module.exports = {
  env: process.env.NODE_ENV,
  queueConfig: {
    host: process.env.AZURE_SERVICE_BUS_HOST,
    username: process.env.AZURE_SERVICE_BUS_USERNAME,
    password: process.env.AZURE_SERVICE_BUS_PASSWORD,
    address: process.env.AZURE_SERVICE_BUS_QUEUE,
    type: 'queue'
  },
  sessionQueueConfig: {
    host: process.env.AZURE_SERVICE_BUS_HOST,
    username: process.env.AZURE_SERVICE_BUS_USERNAME,
    password: process.env.AZURE_SERVICE_BUS_PASSWORD,
    address: process.env.AZURE_SERVICE_BUS_SESSION_QUEUE,
    type: 'sessionQueue'
  }
}
