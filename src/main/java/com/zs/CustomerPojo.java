package com.zs;

// A model for the Customer.
public class CustomerPojo {
 // Customer attributes with Getters and Setters here...
 private String name;
 private String surname;
 private String email;


 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 public String getSurname() {
  return surname;
 }

 public void setSurname(String surname) {
  this.surname = surname;
 }

 public String getEmail() {
  return email;
 }

 public void setEmail(String email) {
  this.email = email;
 }
}