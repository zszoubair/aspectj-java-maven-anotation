/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const assert = require('assert');
const { OpticalReferential } = require('../../utils/index');
const { When, Then } = require('cucumber');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

const client = new OpticalReferential();

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/* ********   Export unknown file   ******** */
When(/^I (try to )?export the data of the optical referential "([^"]*)"$/, function (tryTo, keyName, callback) {
    client
        .export(keyName)
        .then((response) => {
            this.opticalReferentials = response;
            callback();
        })
        .catch((res) => {
            if (tryTo) {
                this.error = res.error;
                this.statusCode = res.statusCode;
                callback();
            }
            callback(res);
        });
});

Then('the data of the optical referential are correctly exported and status code is {string}', function (statusCode, callback) {
    assert.ok(statusCode, this.opticalReferentials.statusCode);
    assert.ok(this.opticalReferentials.body !== (null || undefined));
    callback();
});

