Feature: Delete the data of an optical referential

  @smokeTests @deleteOpticalReferential
  Scenario: Delete the data of an optical referential
    Given I upload an optical referential file "cucumber__test.csv"
    When I delete the data of the optical referential "cucumber__test.csv"
    When I try to export the data of the optical referential "cucumber__test.csv"
    Then an error "404" is returned


  @smokeTests @deleteOpticalReferential
  Scenario: Export the data of an optical referential in a CSV file
    When I try to delete the data of the optical referential "unknown_optical_referential.csv"
    Then an error "404" is returned
