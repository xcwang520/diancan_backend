var cache = require('memory-cache');

var put = function(key, value) {
  return cache.put(key, value, 1000*60*60*24*15);
}

var get = function(key) {
  return cache.get(key);
}

var remove = function(key) {
  return cache.delete(key);
}

var keys = function() {
  return cache.keys();
}

module.exports = {
    put, get, remove, keys
};
