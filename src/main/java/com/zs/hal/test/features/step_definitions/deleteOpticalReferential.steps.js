/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { OpticalReferential } = require('../../utils/index');
const { When } = require('cucumber');

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

When('I delete the data of the optical referential {string}', keyName => client.delete(keyName));

When('I try to delete the data of the optical referential {string}', function (keyName, callback) {
    client
        .export(keyName)
        .catch((res) => {
            this.error = res.error;
            this.statusCode = res.statusCode;
            callback();
        });
});
