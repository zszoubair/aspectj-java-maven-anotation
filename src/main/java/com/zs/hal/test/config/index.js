/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
    getConfig,
    getTargetEnvironment,
    getTargetDomain,
    getTimeout,
    getAuthConfig,
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */

/* ************************************* */

function getTimeout() {
    return 10;
}

function getTargetEnvironment() {
    return process.env.TARGET_ENV || 'it';
}

function getTargetDomain() {
    return process.env.TARGET_DOMAIN || 'cegedim-next.net';
}

function getBccFQDN() {
    const env = getTargetEnvironment();
    const targetDomain = getTargetDomain();
    return `bcc.${env}.${targetDomain}`;
}

function getUrl() {
    if (process.env.TARGET_ENDPOINT) {
        return process.env.TARGET_ENDPOINT;
    }
    if (process.env.TARGET_ENV === 'local') {
        return 'http://localhost:8080';
    }
    return `http://${getBccFQDN()}/datahub/collect/api`;
}

function getConfig() {
    return {
        bcc_datahub_collect_api: getUrl(),
    };
}

function getAuthConfig() {
    return {
        keycloak_url: 'https://idp.cegedim-next.net/auth',
        keycloak_realm: 'beyond',
        keycloak_enabled: true,
        keycloak_username: 'beyond-tester@outlook.com',
        keycloak_password: 'beyond-tester',
        keycloak_clientId: 'bcc-datahub-collect-ui',
    };
}
