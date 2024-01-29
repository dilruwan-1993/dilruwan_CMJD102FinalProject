package com.pos.main.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO<T> implements Serializable {

    private Date date = new Date();
    private String message = SystemUtils.SUCCESS_RESPONSE;
    private T data;
    private int statusCode = 200;
    private String statusMessage = "ok";

}
