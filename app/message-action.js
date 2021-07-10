const config = require('./config')
const { MessageSender } = require('ffc-messaging')

module.exports = async function (message) {
  console.log('Message received:', message.body)
  const responseMessage = {
    body: { content: `Your message was ${message.body.content}` },
    type: 'session test message',
    subject: 'test',
    source: 'async backend',
    sessionId: message.correlationId
  }
  const sessionQueueSender = new MessageSender(config.sessionQueueConfig)
  await sessionQueueSender.sendMessage(responseMessage)
  await sessionQueueSender.closeConnection()
}
