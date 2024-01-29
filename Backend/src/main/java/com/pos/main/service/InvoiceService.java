package com.pos.main.service;

import com.pos.main.dto.InvoiceDTO;
import com.pos.main.entity.Invoice;
import com.pos.main.util.ResponseDTO;

import java.util.List;

public interface InvoiceService {

    public ResponseDTO<InvoiceDTO> saveInvoice(InvoiceDTO dto);

    public ResponseDTO<List<InvoiceDTO>> getAllActiveInvoices();

    public ResponseDTO<?> deleteInvoice(int id);

    public Invoice convertDtoToEntity(InvoiceDTO dto);

    public InvoiceDTO convertEntityToDto(Invoice entity);

}
