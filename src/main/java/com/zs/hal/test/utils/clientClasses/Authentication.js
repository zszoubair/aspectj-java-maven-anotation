/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const requestPromise = require('request-promise');
const joi = require('joi');
const config = require('../../config');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Fix to manage self signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// joi schema for Authentication
// check length of token????
const joiSchemaAuthentication = joi.object().keys({
    access_token: joi.string().required(),
    expires_in: joi.number().required(),
    refresh_expires_in: joi.number().required(),
    refresh_token: joi.string().required(),
    token_type: joi.string().required(),
    id_token: joi.string().required(),
    'not-before-policy': joi.number().required(),
    session_state: joi.string().required(),
});

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */
class Authentication {
    static _manageResponse(response) {
        if (response.statusCode !== 200) {
            throw new Error(`Invalid status code: ${response.statusCode}`);
        }
        this.access_token = response.body.access_token;
        this.refresh_token = response.body.refresh_token;
        this.expirationTokenTime = new Date().getTime() + (response.body.expires_in * 1000);
        this.expirationRefreshTokenTime = new Date().getTime() + (response.body.refresh_expires_in * 1000);
        return this.access_token;
    }

    static _getToken() {
        return requestPromise({
            method: 'POST',
            baseUrl: this.authConfig.keycloak_url,
            uri: `/realms/${this.authConfig.keycloak_realm}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            json: true,
            form: {
                grant_type: 'password',
                client_id: this.authConfig.keycloak_clientId,
                username: this.authConfig.keycloak_username,
                password: this.authConfig.keycloak_password,
            },
            resolveWithFullResponse: true,
        }).then(response => this._manageResponse(response)); // eslint-disable-line no-underscore-dangle
    }

    static _refreshToken() {
        return requestPromise({
            method: 'POST',
            baseUrl: this.authConfig.keycloak_url,
            uri: `/realms/${this.authConfig.keycloak_realm}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            json: true,
            form: {
                grant_type: 'refresh_token',
                client_id: this.authConfig.keycloak_clientId,
                username: this.authConfig.keycloak_username,
                password: this.authConfig.keycloak_password,
                refresh_token: this.refresh_token,
            },
            resolveWithFullResponse: true,
        }).then(response => this._manageResponse(response)); // eslint-disable-line no-underscore-dangle
    }

    /**
     * Login
     * @returns {Promise}
     */
    static login() {
        if (!this.authConfig) {
            this.authConfig = config.getAuthConfig();
        }

        if (this.authConfig.keycloak_enabled) {
            if (!this.access_token) {
                return this._getToken(); // eslint-disable-line no-underscore-dangle
            }
            const now = new Date().getTime();
            // If token is expirated but not resfresh token, we need to refresh it
            if (now >= this.expirationTokenTime && now < this.expirationRefreshTokenTime) {
                return this._refreshToken(); // eslint-disable-line no-underscore-dangle
                // If refresh token is expirated, we need to get a new token
            } else if (now >= this.expirationRefreshTokenTime) {
                return this._getToken(); // eslint-disable-line no-underscore-dangle
            }
            return Promise.resolve(this.access_token);
        }
        return Promise.resolve();
    }

    /**
     * return the joi schema for the "get one" or "post" authentication
     * @returns {*}
     */
    static getJoiSchemaForOne() {
        return joiSchemaAuthentication.required();
    }

    static request(params) {
        return this.login().then((token) => {
            const authParams = {
                ...params,
                headers: {
                    ...params.headers,
                    Authorization: `bearer ${token}`,
                },
            };
            return requestPromise(authParams);
        });
    }
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = Authentication;
