Feature: Get the list of optical referentials

  @smokeTests @opticalReferential @getOpticalReferentialList @hasUpload
  Scenario: Get the list of optical referentials
    Given I upload an optical referential file "cucumber__test.csv"
    When I get the list of optical referentials
    Then the list of optical referentials returned is correct
    Then the optical referential with keyName "cucumber__test.csv" exists

  @smokeTests @opticalReferential @getOpticalReferentialListPaginated @hasUpload
  Scenario: Get the list of optical referentials paginated
    Given I upload an optical referential file "cucumber__test.csv"
    Given I upload an optical referential file "cucumber__test2.csv"
    Given I upload an optical referential file "cucumber__test3.csv"
    When I get the list of optical referentials with perPage = “1” and page = ”2”
    Then the list of optical referentials returned is correct
    Then “1” result is returned
    Then the optical referential with keyName "cucumber__test2.csv" exists
