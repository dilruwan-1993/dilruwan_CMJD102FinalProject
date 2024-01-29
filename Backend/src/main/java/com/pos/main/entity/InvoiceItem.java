/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pos.main.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author MSSi
 */
@Entity
@Table(name = "invoice_item")
@NamedQueries({
    @NamedQuery(name = "InvoiceItem.findAll", query = "SELECT i FROM InvoiceItem i")
    , @NamedQuery(name = "InvoiceItem.findByItemId", query = "SELECT i FROM InvoiceItem i WHERE i.itemId = :itemId")
    , @NamedQuery(name = "InvoiceItem.findByItemQty", query = "SELECT i FROM InvoiceItem i WHERE i.itemQty = :itemQty")
    , @NamedQuery(name = "InvoiceItem.findByItemPrice", query = "SELECT i FROM InvoiceItem i WHERE i.itemPrice = :itemPrice")
    , @NamedQuery(name = "InvoiceItem.findBySubTotal", query = "SELECT i FROM InvoiceItem i WHERE i.subTotal = :subTotal")})
public class InvoiceItem implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "item_id", nullable = false)
    private Integer itemId;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "item_qty", precision = 22, scale = 0)
    private Double itemQty;
    @Column(name = "item_price", precision = 22, scale = 0)
    private Double itemPrice;
    @Column(name = "sub_total", precision = 22, scale = 0)
    private Double subTotal;
    @JoinColumns({
        @JoinColumn(name = "invoice_id", referencedColumnName = "invoice_id")
    })
    @ManyToOne
    private Invoice invoice;
    @JoinColumn(name = "product_stock_id", referencedColumnName = "product_stock_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private ProductStock productStockId;

    public InvoiceItem() {
    }

    public InvoiceItem(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Double getItemQty() {
        return itemQty;
    }

    public void setItemQty(Double itemQty) {
        this.itemQty = itemQty;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public ProductStock getProductStockId() {
        return productStockId;
    }

    public void setProductStockId(ProductStock productStockId) {
        this.productStockId = productStockId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (itemId != null ? itemId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof InvoiceItem)) {
            return false;
        }
        InvoiceItem other = (InvoiceItem) object;
        if ((this.itemId == null && other.itemId != null) || (this.itemId != null && !this.itemId.equals(other.itemId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pos.main.entity.InvoiceItem[ itemId=" + itemId + " ]";
    }
    
}
