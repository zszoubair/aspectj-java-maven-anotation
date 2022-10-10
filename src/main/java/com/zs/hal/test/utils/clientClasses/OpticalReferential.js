/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const joi = require('joi');
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../../config');
const Authentication = require('./Authentication');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const uriOpticalReferential = '/v1/rawdata';

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */

class Referential {
    constructor() {
        this.baseUrl = config.getConfig().bcc_datahub_collect_api;
    }

    /*
     * create an optical referential
     */
    post(body) {
        return Authentication.login().then((token) => {
            const formData = new FormData();
            if (body.file) {
                formData.append('file', body.file);
            }
            const { keyName, source, encoding } = body;
            formData.append('keyName', keyName);
            formData.append('source', source);
            formData.append('encoding', encoding);

            return fetch(`${this.baseUrl}${uriOpticalReferential}`, {
                method: 'post',
                body: formData,
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }).then((response) => {
                if (response.status < 200 || response.status >= 400) {
                    return response.json().then((content) => {
                        const error = Referential.createError(response, content);
                        throw error;
                    });
                }
                return response;
            });
        });
    }

    /**
     * create error object for http errors
     */
    static createError(response, data) {
        const responsePayload = {
            data,
            headers: response.headers,
            method: 'post',
            statusCode: response.status,
        };
        responsePayload.error = new Error(response.statusText);
        responsePayload.error.errors = data.errors;
        return responsePayload;
    }

    export(keyName) {
        return Authentication.request({
            method: 'GET',
            baseUrl: this.baseUrl,
            uri: `${uriOpticalReferential}/${keyName}`,
            resolveWithFullResponse: true,
            encoding: 'binary',
        });
    }

    getAll(qs) {
        return Authentication.request({
            method: 'GET',
            baseUrl: this.baseUrl,
            uri: `${uriOpticalReferential}`,
            json: true,
            qs,
        });
    }

    delete(keyName) {
        return Authentication.request({
            method: 'DELETE',
            baseUrl: this.baseUrl,
            uri: `${uriOpticalReferential}/${keyName}`,
        });
    }

    static getJoiSchemaForAll() {
        return joi
            .object()
            .keys({
                data: joi
                    .array()
                    .items(joi.object())
                    .required(),
                paging: joi.object().keys({
                    pages: joi
                        .number()
                        .integer()
                        .min(0)
                        .required(),
                    totalElements: joi
                        .number()
                        .integer()
                        .min(0)
                        .required(),
                    page: joi
                        .number()
                        .integer()
                        .min(1)
                        .required(),
                    perPage: joi
                        .number()
                        .integer()
                        .required(),
                }),
            })
            .required();
    }
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = Referential;
