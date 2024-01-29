/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pos.main.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author MSSi
 */
@Entity
@Table(name = "product_stock")
@NamedQueries({
    @NamedQuery(name = "ProductStock.findAll", query = "SELECT p FROM ProductStock p")
    , @NamedQuery(name = "ProductStock.findByProductStockId", query = "SELECT p FROM ProductStock p WHERE p.productStockId = :productStockId")
    , @NamedQuery(name = "ProductStock.findBySellingPrice", query = "SELECT p FROM ProductStock p WHERE p.sellingPrice = :sellingPrice")
    , @NamedQuery(name = "ProductStock.findByQty", query = "SELECT p FROM ProductStock p WHERE p.qty = :qty")
    , @NamedQuery(name = "ProductStock.findByUnitOfMeasure", query = "SELECT p FROM ProductStock p WHERE p.unitOfMeasure = :unitOfMeasure")
    , @NamedQuery(name = "ProductStock.findByProductStockStatus", query = "SELECT p FROM ProductStock p WHERE p.productStockStatus = :productStockStatus")})
public class ProductStock implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "product_stock_id", nullable = false)
    private Integer productStockId;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "selling_price", precision = 22, scale = 0)
    private Double sellingPrice;
    @Basic(optional = false)
    @Column(nullable = false)
    private double qty;
    @Basic(optional = false)
    @Column(name = "unit_of_measure", nullable = false, length = 45)
    private String unitOfMeasure;
    @Column(name = "product_stock_status")
    private Integer productStockStatus;
    @Column(name = "pack_size")
    private Double packSize;
    @OneToMany(mappedBy = "productStockId",fetch = FetchType.LAZY)
    private List<InvoiceItem> invoiceItemList;
    @JoinColumn(name = "product_id", referencedColumnName = "product_id", nullable = false)
    @ManyToOne(optional = false)
    private Product productId;

    public ProductStock() {
    }

    public ProductStock(Integer productStockId) {
        this.productStockId = productStockId;
    }

    public ProductStock(Integer productStockId, double qty, String unitOfMeasure) {
        this.productStockId = productStockId;
        this.qty = qty;
        this.unitOfMeasure = unitOfMeasure;
    }

    public Integer getProductStockId() {
        return productStockId;
    }

    public void setProductStockId(Integer productStockId) {
        this.productStockId = productStockId;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public Integer getProductStockStatus() {
        return productStockStatus;
    }

    public void setProductStockStatus(Integer productStockStatus) {
        this.productStockStatus = productStockStatus;
    }

    public List<InvoiceItem> getInvoiceItemList() {
        return invoiceItemList;
    }

    public void setInvoiceItemList(List<InvoiceItem> invoiceItemList) {
        this.invoiceItemList = invoiceItemList;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public Double getPackSize() {
        return packSize;
    }

    public void setPackSize(Double packSize) {
        this.packSize = packSize;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (productStockId != null ? productStockId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ProductStock)) {
            return false;
        }
        ProductStock other = (ProductStock) object;
        if ((this.productStockId == null && other.productStockId != null) || (this.productStockId != null && !this.productStockId.equals(other.productStockId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pos.main.entity.ProductStock[ productStockId=" + productStockId + " ]";
    }
    
}
