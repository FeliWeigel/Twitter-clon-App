package com.app.twitterclon.exception;

public class CredentialsNotFoundException extends RuntimeException{

    public CredentialsNotFoundException(String message){
        super(message);
    }
}
