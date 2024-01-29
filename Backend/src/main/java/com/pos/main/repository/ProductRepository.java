package com.pos.main.repository;

import com.pos.main.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    public boolean existsByProductName(String productName);

    public List<Product> findAllByProductStatus(int status);

    public Product findProductByProductIdAndAndProductStatus(int id, int ststus);

}
