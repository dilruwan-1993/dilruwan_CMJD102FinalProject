package com.pos.main.service;

import com.pos.main.dto.CategoryDTO;
import com.pos.main.dto.ProductDTO;
import com.pos.main.dto.ProductStockDTO;
import com.pos.main.entity.Product;
import com.pos.main.entity.ProductStock;
import com.pos.main.util.ResponseDTO;

import java.util.List;

public interface ProductService {

    public ResponseDTO<ProductDTO> saveProduct(ProductDTO dto);

    public ResponseDTO<ProductDTO> upsateProduct(ProductDTO dto);

    public ResponseDTO<List<ProductDTO>> getAllProducts();

    public ResponseDTO<ProductDTO> getProductById(int id);

    public ResponseDTO<?> deleteProduct(int id);

    public ProductDTO convertEntityToDto(Product entity);

    public Product convertDtoToEntity(ProductDTO dto);

    public ProductStockDTO convertStockEntityToDto(ProductStock stock);
}
