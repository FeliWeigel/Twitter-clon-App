package com.app.twitterclon.exception;

public class InvalidPostException extends RuntimeException{

    public InvalidPostException (String message){
        super(message);
    }
}
