package com.example.Backend.DTO;

public class RegisterFormDTO extends LoginFormDTO{
    private String passwordVerification;

    //Add one for Score for making the profile?

    public String getPasswordVerification() {return passwordVerification;}
    public void setPasswordVerification(String passwordVerification) {this.passwordVerification = passwordVerification;}
}
