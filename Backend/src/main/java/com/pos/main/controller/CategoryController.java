package com.pos.main.controller;

import com.pos.main.dto.CategoryDTO;
import com.pos.main.service.CategoryService;
import com.pos.main.util.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/category")
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class CategoryController {

    private final CategoryService service;

    @PostMapping(path = "/save")
    public ResponseEntity<ResponseDTO<?>> save(@RequestBody CategoryDTO dto){
        return ResponseEntity.ok(service.saveCategory(dto));
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<ResponseDTO<?>> getAll(){
        return ResponseEntity.ok(service.getAllCategories());
    }

    @PutMapping(path = "/update")
    public ResponseEntity<ResponseDTO<?>> update(@RequestBody CategoryDTO dto){
        return ResponseEntity.ok(service.updateCategory(dto));
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<ResponseDTO<?>> delete(@PathVariable(name = "id")Integer id){
        return ResponseEntity.ok(service.deleteCategory(id));
    }


}
