package com.pos.main.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InvoiceDTO implements Serializable {

    private Integer invoiceId;
    private String invoiceDate;
    private Double netTotal;
    private Double payment;
    private Integer invoiceStatus;
    private UserDTO user;
    private List<InvoiceItemDTO> invoiceItemList;

}
