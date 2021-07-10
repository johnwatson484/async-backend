(async function () {
  const config = require('./config')
  const messageAction = require('./message-action')
  const { MessageReceiver } = require('ffc-messaging')

  // send and receive from queue
  const queueReceiver = new MessageReceiver(config.queueConfig, messageAction)
  await queueReceiver.subscribe()
}())
