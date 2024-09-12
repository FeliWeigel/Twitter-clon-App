package com.app.twitterclon.config;

import com.app.twitterclon.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(BusyCredentialsException.class)
    @ResponseBody
    public ResponseEntity<String> handleBusyCredentialsException(BusyCredentialsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NullFieldsException.class)
    @ResponseBody
    public ResponseEntity<String> handleNullFieldsException(NullFieldsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseBody
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPostException.class)
    @ResponseBody
    public ResponseEntity<String> handleInvalidPostException(InvalidPostException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(CredentialsNotFoundException.class)
    @ResponseBody
    public ResponseEntity<String> handleCredentialsNotFoundException(CredentialsNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }
}
