package com.pos.main.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductStockDTO implements Serializable {

    private Integer productStockId;
    private Double sellingPrice;
    private double qty;
    private String unitOfMeasure;
    private Integer productId;
    private Double packSize;

}
