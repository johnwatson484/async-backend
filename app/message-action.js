const config = require('./config')
const { MessageSender } = require('ffc-messaging')
const cache = require('./cache')

module.exports = async function (message, receiver) {
  console.log('Message received:', message.body)
  await cache.set(message.correlationId, { content: message.body.content })
  const cacheValue = await cache.get(message.correlationId)

  if (!cacheValue.isReady) {
    // simulate backend processing
    console.log('Processing')
    await new Promise(resolve => setTimeout(resolve, 4000))
    await cache.update(message.correlationId, { isReady: true })
  }

  const responseMessage = {
    body: { content: `Your message was ${cacheValue.content}` },
    type: 'session test message',
    source: 'async backend',
    sessionId: message.messageId
  }
  const sessionQueueSender = new MessageSender(config.sessionQueueConfig)
  await sessionQueueSender.sendMessage(responseMessage)
  await receiver.completeMessage(message)
  await sessionQueueSender.closeConnection()
}
