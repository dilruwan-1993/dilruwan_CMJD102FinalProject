package com.pos.main.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class CustomValidationException extends RuntimeException{

    private String message;

    public CustomValidationException(String message) {
        super(message);
    }
}
