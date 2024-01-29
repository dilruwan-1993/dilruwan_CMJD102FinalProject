package com.pos.main.service;

import com.pos.main.dto.CategoryDTO;
import com.pos.main.entity.Category;
import com.pos.main.util.ResponseDTO;

import java.util.List;

public interface CategoryService {

    public ResponseDTO<CategoryDTO> saveCategory(CategoryDTO dto);

    public ResponseDTO<List<CategoryDTO>> getAllCategories();

    public ResponseDTO<CategoryDTO> updateCategory(CategoryDTO dto);

    public ResponseDTO<?> deleteCategory(int id);

    public CategoryDTO convertEntityToDto(Category entity);

    public Category convertDtoToEntity(CategoryDTO dto);

}
