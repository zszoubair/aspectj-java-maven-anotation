Feature: Export the data of an optical referential in a CSV file

 @smokeTests @exportOpticalReferential @hasUpload
 Scenario: Export the data of an optical referential in a CSV file
   Given I upload an optical referential file "cucumber__test.csv"
    When I export the data of the optical referential "cucumber__test.csv"
    Then the data of the optical referential are correctly exported and status code is "200"


  @smokeTests @exportOpticalReferential
  Scenario: Export the data of an optical referential in a CSV file
    When I try to export the data of the optical referential "unknown_optical_referential.csv"
    Then an error "404" is returned
