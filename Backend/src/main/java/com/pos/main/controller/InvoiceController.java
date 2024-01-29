package com.pos.main.controller;

import com.pos.main.dto.InvoiceDTO;
import com.pos.main.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/invoice")
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService service;

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveInvoice(@RequestBody final InvoiceDTO dto) {
        return ResponseEntity.ok(service.saveInvoice(dto));
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAllActiveInvoices());
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable(name = "id") int id) {
        return ResponseEntity.ok(service.deleteInvoice(id));
    }
}
