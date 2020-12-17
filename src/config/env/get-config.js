const { defaultsDeep } = require('lodash');
const defaultConfig = require('src/config/env/default');
// const releaseConfig = require('src/config/env/release');

const envVariables = require('src/config/env/variables');

const envConfigsMap = {
    // production: releaseConfig,
};

module.exports = function getConfigForEnvironment(env) {
    const envConfig = envConfigsMap[env] || {};

    const config = defaultsDeep(
        {},
        envVariables,
        envConfig,
        defaultConfig
    );

    return config;
};
