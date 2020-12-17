
function getMongoConnectionString(config) {
  const authStr = config.auth ? `${config.user}:${config.password}@` : '';

  return `mongodb://${authStr}${config.host}:${config.port}/${config.dbName}`;
}

module.exports = {
  getMongoConnectionString,
}