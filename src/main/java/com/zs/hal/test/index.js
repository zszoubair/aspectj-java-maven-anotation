/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const reporter = require('cucumber-html-reporter');

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
const options = {
    theme: 'bootstrap',
    jsonFile: 'cucumber_report.json',
    output: 'report/cucumber_report.html',
    reportSuiteAsScenarios: true,
};

/* ************************************* */
/* ********         RUN         ******** */
/* ************************************* */
reporter.generate(options);
