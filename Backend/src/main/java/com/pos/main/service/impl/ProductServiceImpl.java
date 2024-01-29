package com.pos.main.service.impl;

import com.pos.main.dto.CategoryDTO;
import com.pos.main.dto.ProductDTO;
import com.pos.main.dto.ProductStockDTO;
import com.pos.main.entity.Category;
import com.pos.main.entity.Product;
import com.pos.main.entity.ProductStock;
import com.pos.main.repository.CategoryRepository;
import com.pos.main.repository.ProductRepository;
import com.pos.main.repository.ProductStockRepository;
import com.pos.main.service.ProductService;
import com.pos.main.util.CustomValidationException;
import com.pos.main.util.ResponseDTO;
import com.pos.main.util.SystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;
    private final ProductStockRepository stockRepo;
    private final CategoryRepository categoryRepo;

    @PersistenceContext
    private final EntityManager em;

    @Override
    public ResponseDTO<ProductDTO> saveProduct(ProductDTO dto) {
        ResponseDTO<ProductDTO> resp = new ResponseDTO<ProductDTO>();

        if(productRepo.existsByProductName(dto.getProductName())){
            throw new CustomValidationException("Product name already in the System");
        }

        validateProductDto(dto);

        Product product = convertDtoToEntity(dto);
        product.setProductStatus(SystemUtils.ACTIVE_STATUS);

        ProductStock stock = new ProductStock();
        stock.setProductId(product);
        stock.setProductStockStatus(SystemUtils.ACTIVE_STATUS);
        stock.setPackSize(dto.getProductStock().getPackSize());
        stock.setQty(dto.getProductStock().getQty());
        stock.setSellingPrice(dto.getProductStock().getSellingPrice());
        stock.setUnitOfMeasure(dto.getProductStock().getUnitOfMeasure());
        ArrayList<ProductStock> stockList = new ArrayList<>();
        stockList.add(stock);
        product.setProductStockList(stockList);
        // Save the entity
        product = productRepo.save(product);

        // Convert the saved entity back to DTO
        ProductDTO savedDto = convertEntityToDto(product);
        resp.setData(savedDto);
        resp.setStatusMessage(SystemUtils.SUCCESS_RESPONSE);
        resp.setMessage("Successfully saved");
        return resp;
    }

    @Override
    public ResponseDTO<ProductDTO> upsateProduct(ProductDTO dto) {
        ResponseDTO<ProductDTO> resp = new ResponseDTO<ProductDTO>();
        validateProductDto(dto);
        if(dto.getProductId() != null) {
            Optional<Product> byId = productRepo.findById(dto.getProductId());
            Product product = byId.get();
            if(product != null){
                product.setProductName(dto.getProductName());
                product.setProductImgPath(dto.getProductImgPath());
                product.setProductDescription(dto.getProductDescription());
                List<ProductStock> stockList = product.getProductStockList();
                if (stockList == null){
                    Query q = em.createNativeQuery("select * from product_stock WHERE product_id = '"+product.getProductId()+"' ",ProductStock.class);
                    stockList = q.getResultList();
                }
                if(stockList != null && stockList.size() > 0){
                    ProductStock stock = stockList.get(0);
                    List<ProductStock> updatedStockList = new ArrayList<>();
                    stock.setUnitOfMeasure(dto.getProductStock().getUnitOfMeasure());
                    stock.setQty(dto.getProductStock().getQty());
                    stock.setPackSize(dto.getProductStock().getPackSize());
                    stock.setSellingPrice(dto.getProductStock().getSellingPrice());
                    updatedStockList.add(stock);
                    product.setProductStockList(updatedStockList);
                }
                Product saved = productRepo.save(product);
                if(saved != null){
                    ProductDTO respDto = convertEntityToDto(product);
                    resp.setData(respDto);
                    resp.setMessage("Successfully Updated");
                }else{
                    resp.setMessage("Update Failure");
                    resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                }

            }else{
                resp.setMessage("Product not found for given ID");
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            }
        }else{
            throw new CustomValidationException("Product ID cannot be empty");
        }
        return resp;
    }

    @Override
    public ResponseDTO<List<ProductDTO>> getAllProducts() {
        ResponseDTO<List<ProductDTO>> resp = new ResponseDTO<List<ProductDTO>>();
        List<Product> productList = productRepo.findAllByProductStatus(SystemUtils.ACTIVE_STATUS);

        // Convert the list of entities to a list of DTOs
        List<ProductDTO> productDTOList = productList.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
        resp.setData(productDTOList);
        return resp;
    }

    @Override
    public ResponseDTO<ProductDTO> getProductById(int id) {
        ResponseDTO<ProductDTO> resp = new ResponseDTO<>();
        Product product = productRepo.findProductByProductIdAndAndProductStatus(id, SystemUtils.ACTIVE_STATUS);
        if(product != null){
            ProductDTO dto = convertEntityToDto(product);
            resp.setData(dto);
            resp.setStatusMessage(SystemUtils.SUCCESS_RESPONSE);
        }else{
            resp.setMessage("Product not found for given ID");
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
        }
        return resp;
    }

    @Override
    public ResponseDTO<?> deleteProduct(int id) {
        ResponseDTO<?> resp = new ResponseDTO<>();

        Optional<Product> byId = productRepo.findById(id);
        Product product = byId.get();
        if (product != null){
            product.setProductStatus(SystemUtils.DEACTIVE_STATUS);
            productRepo.save(product);
            resp.setMessage("Successfully Deleted");
        }else{
            resp.setMessage("Product not found");
        };
        return resp;
    }

    @Override
    public ProductDTO convertEntityToDto(Product entity) {
        ProductDTO dto =  new ProductDTO();
        dto.setProductId(entity.getProductId());
        dto.setProductName(entity.getProductName());
        dto.setProductDescription(entity.getProductDescription());
        dto.setProductImgPath(entity.getProductDescription());
        dto.setCategoryId(entity.getCategoryId().getCategoryId());
        dto.setCategoryName(entity.getCategoryId().getCategoryName());

        ProductStockDTO stockDto = new ProductStockDTO();
        List<ProductStock> stockList = entity.getProductStockList();
        if(stockList == null){
            String sql = "select * from product_stock WHERE product_id = '"+entity.getProductId()+"' ";
            Query query = em.createNativeQuery(sql, ProductStock.class);
            stockList = query.getResultList();
        }
        List<ProductStockDTO> dtos = stockList.stream()
                .map(this::convertStockEntityToDto)
                .collect(Collectors.toList());
        if(dtos != null && dtos.size() > 0){
            stockDto = dtos.get(0);
        }
        dto.setProductStock(stockDto);

        return dto;
    }

    @Override
    public Product convertDtoToEntity(ProductDTO dto) {
        Product pro = new Product();
        pro.setProductDescription(dto.getProductDescription());
        pro.setProductName(dto.getProductName());
        pro.setProductImgPath(dto.getProductImgPath());
        Optional<Category> byId = categoryRepo.findById(dto.getCategoryId());
        Category category = byId.get();
        pro.setCategoryId(category);
        return pro;
    }

    @Override
    public ProductStockDTO convertStockEntityToDto(ProductStock stock){
        ProductStockDTO dto = new ProductStockDTO();
        dto.setProductStockId(stock.getProductStockId());
        dto.setQty(stock.getQty());
        dto.setSellingPrice(stock.getSellingPrice());
        dto.setUnitOfMeasure(stock.getUnitOfMeasure());
        dto.setPackSize(stock.getPackSize());
        dto.setProductId(stock.getProductId() != null ? stock.getProductId().getProductId() : null);
        return dto;
    }

    private void validateProductDto(ProductDTO dto){
        if (dto.getProductName() == null || dto.getProductName().isEmpty()) {
            throw new CustomValidationException("Product name is required");
        }

        if (dto.getProductDescription() == null || dto.getProductDescription().isEmpty()) {
            throw new CustomValidationException("Product description is required");
        }

        if (dto.getProductImgPath() == null || dto.getProductImgPath().isEmpty()) {
            throw new CustomValidationException("Product image path is required");
        }

        if (dto.getCategoryId() == null) {
            throw new CustomValidationException("Category ID is required");
        }
        // Validate the product stock
        ProductStockDTO stockDTO = dto.getProductStock();

        if (stockDTO == null) {
            throw new CustomValidationException("Product stock information is required");
        }else{
            if(stockDTO.getQty() <= 0){
                throw new CustomValidationException("Product QTY in not valid");
            }
            if(stockDTO.getSellingPrice() == null || stockDTO.getSellingPrice() <= 0){
                throw new CustomValidationException("Product Selling Price in not valid");
            }
            if(stockDTO.getUnitOfMeasure() == null || stockDTO.getUnitOfMeasure().isBlank()){
                throw new CustomValidationException("Product UOM in not valid");
            }
            if(stockDTO.getPackSize() == null || stockDTO.getPackSize() <= 0){
                throw new CustomValidationException("Product Pack Size in not valid");
            }
        }
    }
}
