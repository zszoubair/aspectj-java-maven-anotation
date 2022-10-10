/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
const { After, Before } = require('cucumber');
const { OpticalReferential } = require('../../utils/index');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********         RUN         ******** */
/* ************************************* */
After({ tags: '@hasUpload' }, function () {
    return deleteCurrentOpticalReferential.bind(this)();
});

Before({ tags: '@hasUpload' }, function () {
    this.currentOpticalReferential = [];
});

function deleteCurrentOpticalReferential() {
    if (this.currentOpticalReferential) {
        const client = new OpticalReferential();
        return Promise.all(this.currentOpticalReferential.map(item =>
            client.delete(item),
        ));
    }

    return Promise.resolve();
}
