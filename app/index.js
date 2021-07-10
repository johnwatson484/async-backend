let queueReceiver

(async function () {
  const config = require('./config')
  const messageAction = require('./message-action')
  const { MessageReceiver } = require('ffc-messaging')

  const action = message => messageAction(message, queueReceiver)
  queueReceiver = new MessageReceiver(config.queueConfig, action)
  await queueReceiver.subscribe()
}())
