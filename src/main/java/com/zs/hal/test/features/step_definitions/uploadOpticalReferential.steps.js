/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { OpticalReferential } = require('../../utils/index');
const fs = require('fs');
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

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */
When(
    /^I (try to)?upload an optical referential file "([^"]*)"$/,
    function (
        tryTo,
        fileName,
        callback,
    ) {
        const fileContent = fs.createReadStream(`features/resources/${fileName}`);
        this.optical_referential_body = {};
        this.optical_referential_body.file = fileContent;
        this.optical_referential_body.keyName = fileName;
        this.optical_referential_body.source = 'Source';
        this.optical_referential_body.encoding = 'UTF-8';
        this.optical_referential_body.fileType = 'CSV';
        const client = new OpticalReferential();
        client
            .post(this.optical_referential_body)
            .then((res) => {
                this.statusCode = res.status;
                this.currentOpticalReferential.push(fileName);
                callback();
            })
            .catch((res) => {
                if (tryTo) {
                    this.error = res.error;
                    this.statusCode = res.statusCode;
                    callback();
                } else {
                    callback(res.error);
                }
            });
    },
);
