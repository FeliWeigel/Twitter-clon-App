package com.app.twitterclon.exception;

import java.io.IOException;

public class FileUploadException extends RuntimeException{
    public FileUploadException(String message, IOException e){
        super(message);
    }
}
