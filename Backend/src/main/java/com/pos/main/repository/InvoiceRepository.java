package com.pos.main.repository;

import com.pos.main.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {

    public List<Invoice> findAllByInvoiceStatus(int status);

}
