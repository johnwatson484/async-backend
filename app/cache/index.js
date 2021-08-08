const hoek = require('@hapi/hoek')
const { Client, Policy } = require('@hapi/catbox')
const engine = require('@hapi/catbox-memory')
const segment = 'backend'
let cache

const setup = async () => {
  const client = new Client(engine, { partition: segment })
  await client.start()
  cache = new Policy({ expiresIn: 3600 * 1000 }, client, segment)
}

const get = async (key) => {
  const object = await cache.get(key)
  return object ?? {}
}

const set = async (key, value) => {
  await cache.set(key, value, 0)
}

const update = async (key, object) => {
  const existing = await get(key)
  hoek.merge(existing, object, { mergeArrays: false })
  await set(key, existing)
  return existing
}

const clear = async (key) => {
  await cache.drop(key)
}

module.exports = {
  setup,
  get,
  set,
  update,
  clear
}
