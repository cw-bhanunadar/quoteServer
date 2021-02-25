const redis = require("redis");
const config = require("./config.js");
const { promisify } = require("util");
const client = redis.createClient(config.redis.url);

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  deleteAsync: promisify(client.del).bind(client),
};
