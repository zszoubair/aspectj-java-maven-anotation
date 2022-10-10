/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const assert = require('assert');
const { Then } = require('cucumber');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
/**
 *
 * @param statusCode {string} MANDATORY
 * @param errorMessage {string} OPTIONNAL
 * Example of sentence:
 * an error "400" is returned
 * an error "400" is returned with message "missing uid"
 *
 */
Then(/^an error "(.*)" is returned(?: with message "(.*)")?$/, function (statusCode, errorMessage) {
    assert.equal(this.statusCode, statusCode);
    if (errorMessage) {
        assert.equal(this.error.errors[0].message, errorMessage);
    }
});


Then(/^a status "(.*)" is returned$/, function (statusCode) {
    assert.equal(this.statusCode, statusCode);
});
