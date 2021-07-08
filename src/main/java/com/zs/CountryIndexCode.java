package com.zs;


/**
 * Different type of country index.
 */

public enum CountryIndexCode  {
   CURRENT_CRRI("Current CRRI**********Current CRRI**********Current CRRI**********Current CRRI**********Current CRRI**********Current CRRI**********Current CRRI**********Current CRRI**********"),
   ECONOMICAL("Economical"),
   LEGAL("Legal"),
   OPERATIONAL("Operational"),
   OVERALL("Overall"),
   PEAK_CRRI("Peak CRRI"),
   POLITICAL("Political"),
   REP_RISK_CATEGORY("Rep. Risk Category"),
   SECURITY("Security"),
   TAX("Tax");

   CountryIndexCode(String name) {
      this.name = name;
   }

   private String name;

   public String getName() {
      return name;
   }
}
