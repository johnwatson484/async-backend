const config = require('./config')
const { MessageSender } = require('./messaging')

module.exports = async function (message) {
  const queueSender = new MessageSender('queue-sender', config.sessionQueueConfig)
  await queueSender.sendMessage({ body: `Your message was ${message.body}`, sessionId: message.correlationId })
  await queueSender.closeConnection()
}
