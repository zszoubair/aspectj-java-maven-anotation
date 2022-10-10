/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
const { setDefaultTimeout } = require('cucumber');
const config = require('../../config');

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

// Set default timeout
setDefaultTimeout(config.getTimeout() * 1000);
