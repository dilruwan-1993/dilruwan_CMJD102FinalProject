package com.pos.main.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<ResponseDTO<?>> handleCustomValidationException(CustomValidationException ex) {
        ResponseDTO<String> resp = new ResponseDTO<>();
        resp.setMessage(ex.getMessage());
        resp.setStatusCode(HttpStatus.BAD_REQUEST.value());
        resp.setStatusMessage("Bad Request");

        return ResponseEntity.badRequest().body(resp);
    }

}
