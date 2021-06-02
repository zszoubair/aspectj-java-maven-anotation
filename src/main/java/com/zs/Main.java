package com.zs;


import java.util.logging.Logger;

public class Main {
    public static void main(String... args) {
        Student etd = new Student("ZS", "Zoubair");
        System.out.println("lastname anonymized/hashed  => " + etd.getLastName());
        System.out.println("first name => " + etd.getFirstName());
    }


}


