package com.app.twitterclon.exception;

public class BusyCredentialsException extends RuntimeException{
    public BusyCredentialsException(String message){
        super(message);
    }
}
