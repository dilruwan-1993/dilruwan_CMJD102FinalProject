package com.pos.main.controller;

import com.pos.main.dto.ProductDTO;
import com.pos.main.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/product")
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping(path = "/getAll")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping(path = "/getById/{id}")
    public ResponseEntity<?> getProductById(@PathVariable(name = "id")int id){
        return ResponseEntity.ok(service.getProductById(id));
    }

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveProduct(@RequestBody ProductDTO dto) {
        return ResponseEntity.ok(service.saveProduct(dto));
    }

    @PutMapping(path = "/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO dto){
        return ResponseEntity.ok(service.upsateProduct(dto));
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(name = "id")int productId){
        return ResponseEntity.ok(service.deleteProduct(productId));
    }

}
