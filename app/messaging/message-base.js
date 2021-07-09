const { ServiceBusClient } = require('@azure/service-bus')

class MessageBase {
  constructor (name, config) {
    this.name = name
    this.sbClient = new ServiceBusClient(`Endpoint=sb://${config.host}/;SharedAccessKeyName=${config.username};SharedAccessKey=${config.password}`)
  }

  async closeConnection () {
    await this.sbClient.close()
    console.log(`${this.name} connection closed`)
  }
}

module.exports = MessageBase
