/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const assert = require('assert');
const { OpticalReferential } = require('../../utils/index');
const joi = require('joi');
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

When('I get the list of optical referentials', function (callback) {
    client
        .getAll()
        .then((response) => {
            this.opticalReferentials = response;
            this.paging = response.paging;
            callback();
        })
        .catch(callback);
});

When('I get the list of optical referentials with perPage = “{int}” and page = ”{int}”', function (perPage, page, callback) {
    client
        .getAll({ perPage, page })
        .then((response) => {
            this.opticalReferentials = response;
            this.paging = response.paging;
            callback();
        })
        .catch(callback);
});

Then('“{int}” result is returned', function (resultCount) {
    assert.equal(this.opticalReferentials.data.length, resultCount);
});


Then('the list of optical referentials returned is correct', function () {
    const schemaResultTest = joi.validate(this.opticalReferentials, OpticalReferential.getJoiSchemaForAll());
    assert.ok(schemaResultTest.error === null);
});

Then('the optical referential with keyName {string} exists', function (keyName) {
    const opticalReferential = this.opticalReferentials.data.find(item => item.keyName === keyName);
    assert.equal(opticalReferential.keyName, keyName);
});
