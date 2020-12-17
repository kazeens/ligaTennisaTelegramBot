const envVariables = require('src/config/env/variables');
const getConfigForEnvironment = require('src/config/env/get-config');

const config = getConfigForEnvironment(envVariables.env);

module.exports = config;