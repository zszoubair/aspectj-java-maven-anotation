Feature: Upload of an optical referential

  @smokeTests @opticalReferential @uploadOpticalReferential @hasUpload
  Scenario: Upload an optical referential with an attached file
    When I upload an optical referential file "cucumber__test.csv"
    Then a status "201" is returned
