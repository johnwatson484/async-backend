(async function () {
  const config = require('./config')
  const messageAction = require('./message-action')
  const { MessageReceiver } = require('./messaging')

  // send and receive from queue
  const queueReceiver = new MessageReceiver('queue-receiver', config.queueConfig, messageAction)
}())
