package com.zs;


public class Main {
    public static void main(String... args) {
        Student etd = new Student("ZS", "Zoubair");
//        etd.setExportPhase(true);
        System.out.println("lastname  => " + etd.getLastName());
        System.out.println("first name => " + etd.getFirstName());
    }


}


