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
public class ProductDTO implements Serializable {

    private Integer productId;
    private String productName;
    private String productDescription;
    private String productImgPath;
    private Integer categoryId;
    private String categoryName;
    private Integer productStatus;
    private ProductStockDTO productStock;

}
