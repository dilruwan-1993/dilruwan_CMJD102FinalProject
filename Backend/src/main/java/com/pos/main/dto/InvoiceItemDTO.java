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
public class InvoiceItemDTO implements Serializable {

    private Integer itemId;
    private Double itemQty;
    private Double itemPrice;
    private Double subTotal;
    private Integer productStockId;
    private String productName;
    private Integer productId;

}
