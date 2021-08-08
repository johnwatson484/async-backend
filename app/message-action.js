const config = require('./config')
const { MessageSender } = require('ffc-messaging')
const cache = require('./cache')

module.exports = async function (message, receiver) {
  console.log('Message received:', message.body)
  const sessionCache = await cache.get(message.correlationId)

  // ensure all array for all session requests created
  if (!sessionCache.processingRequests) {
    sessionCache.processingRequests = []
  }
  // if content is unique to session add to cache
  if (!sessionCache.processingRequests.find(x => x.content === message.body.content)) {
    sessionCache.processingRequests.push({ content: message.body.content })
    await cache.update(message.correlationId, sessionCache)
  }

  const processingRequestIndex = sessionCache.processingRequests.findIndex(x => x.content === message.body.content)

  // if content has already been processed then return without reprocessing
  if (!sessionCache.processingRequests[processingRequestIndex].isReady) {
    // simulate backend processing
    console.log('Processing')
    await new Promise(resolve => setTimeout(resolve, 4000))
    sessionCache.processingRequests[processingRequestIndex].isReady = true
    await cache.update(message.correlationId, sessionCache)
  }

  const responseMessage = {
    body: { content: `Your message was ${sessionCache.processingRequests[processingRequestIndex].content}` },
    type: 'session test message',
    source: 'async backend',
    sessionId: message.messageId
  }
  const sessionQueueSender = new MessageSender(config.sessionQueueConfig)
  await sessionQueueSender.sendMessage(responseMessage)
  await receiver.completeMessage(message)
  await sessionQueueSender.closeConnection()
  console.log('Response sent')
}
