
function getMongoConnectionString(config) {
  const authStr = config.auth ? `${config.user}:${config.password}@` : '';

  return `mongodb://${authStr}${config.host}:${config.port}/${config.dbName}`;
}

function toCamelCase(o) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function(value) {
        if (typeof value === "object") {
          value = toCamel(value)
        }
        return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

module.exports = {
  getMongoConnectionString,
  toCamelCase,
}