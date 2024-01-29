package com.pos.main.service.impl;

import com.pos.main.dto.CategoryDTO;
import com.pos.main.entity.Category;
import com.pos.main.repository.CategoryRepository;
import com.pos.main.service.CategoryService;
import com.pos.main.util.ResponseDTO;
import com.pos.main.util.SystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRpo;

    @PersistenceContext
    private final EntityManager em;

    @Override
    public ResponseDTO<CategoryDTO> saveCategory(CategoryDTO dto) {
        ResponseDTO<CategoryDTO> resp = new ResponseDTO<CategoryDTO>();
        if (!dto.getCategoryName().isBlank()) {
            Category save = categoryRpo.save(convertDtoToEntity(dto));
            if (save != null) {
                resp.setMessage("Successfully Registered");
                resp.setData(convertEntityToDto(save));
            } else {
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                resp.setMessage("Insertion Error");
            }
        } else {
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            resp.setMessage("Please enter the category name");
        }
        return resp;
    }

    @Override
    public ResponseDTO<List<CategoryDTO>> getAllCategories() {
        ResponseDTO<List<CategoryDTO>> resp = new ResponseDTO<List<CategoryDTO>>();
        List<CategoryDTO> dtoList = categoryRpo.findAllByCategoryStatus(SystemUtils.ACTIVE_STATUS)
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
        resp.setData(dtoList);
        return resp;
    }

    @Override
    public ResponseDTO<CategoryDTO> updateCategory(CategoryDTO dto) {
        ResponseDTO<CategoryDTO> resp = new ResponseDTO<CategoryDTO>();
        if(dto.getCategoryId() != null){
            if(!dto.getCategoryName().isBlank()){
                Optional<Category> byId = categoryRpo.findById(dto.getCategoryId());
                if(byId.isPresent()){
                    Category category = byId.get();
                    category.setCategoryName(dto.getCategoryName());
                    Category updated = categoryRpo.save(category);
                    if(updated != null){
                        resp.setMessage("Successfully Updated");
                        resp.setData(convertEntityToDto(updated));
                    }else{
                        resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                        resp.setMessage("Update Failure");
                    }
                }else{
                    resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                    resp.setMessage("Category not found for given ID");
                }
            }else{
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                resp.setMessage("Name cannot be empty");
            }
        }else{
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            resp.setMessage("Category ID required");
        }
        return resp;
    }

    @Override
    public ResponseDTO<?> deleteCategory(int id) {
        ResponseDTO<?> resp = new ResponseDTO<>();
        Optional<Category> byId = categoryRpo.findById(id);
        if(byId.isPresent()){
            Category category = byId.get();
            category.setCategoryStatus(SystemUtils.DEACTIVE_STATUS);
            Category updated = categoryRpo.save(category);
            if(updated != null){
                resp.setMessage("Successfully Deleted");
            }else{
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                resp.setMessage("Update Failure");
            }
        }else{
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            resp.setMessage("Category not found");
        }
        return resp;
    }

    @Override
    public CategoryDTO convertEntityToDto(Category entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(entity.getCategoryId());
        dto.setCategoryName(entity.getCategoryName());
        dto.setCategoryStatus(entity.getCategoryStatus());
        return dto;
    }

    @Override
    public Category convertDtoToEntity(CategoryDTO dto) {
        Category cat = new Category();
        cat.setCategoryStatus(SystemUtils.ACTIVE_STATUS);
        cat.setCategoryName(dto.getCategoryName());
        return cat;
    }
}
