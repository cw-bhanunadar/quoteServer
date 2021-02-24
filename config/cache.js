const redis = require("redis");
const config = require("./config.js");
const client = redis.createClient(config.redis.url);

client.on("connect", function (data) {
  console.log("Successfully conected to cache");
});
