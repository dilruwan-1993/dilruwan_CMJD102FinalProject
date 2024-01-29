package com.pos.main.service.impl;

import com.pos.main.dto.InvoiceDTO;
import com.pos.main.dto.InvoiceItemDTO;
import com.pos.main.dto.UserDTO;
import com.pos.main.entity.Invoice;
import com.pos.main.entity.InvoiceItem;
import com.pos.main.entity.ProductStock;
import com.pos.main.entity.User;
import com.pos.main.repository.InvoiceItemRepository;
import com.pos.main.repository.InvoiceRepository;
import com.pos.main.repository.ProductStockRepository;
import com.pos.main.service.InvoiceService;
import com.pos.main.service.UserService;
import com.pos.main.util.CustomValidationException;
import com.pos.main.util.ResponseDTO;
import com.pos.main.util.SystemUtils;
import com.pos.main.util.UsersContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepo;
    private final InvoiceItemRepository invoiceItemRepo;
    private final ProductStockRepository stockRepo;
    private final UsersContext context;
    private final UserService userService;

    @PersistenceContext
    private final EntityManager em;

    @Override
    public ResponseDTO<InvoiceDTO> saveInvoice(InvoiceDTO dto) {
        ResponseDTO<InvoiceDTO> resp = new ResponseDTO<>();
        if (dto == null) {
            throw new CustomValidationException("Bad Request Data");
        }
        if (dto.getNetTotal() == null || dto.getNetTotal() < 0) {
            throw new CustomValidationException("Invalid Net Total");
        }
        if (dto.getPayment() == null || dto.getPayment() < 0) {
            throw new CustomValidationException("Invalid Payment");
        }
        if (dto.getInvoiceItemList() == null || dto.getInvoiceItemList().size() < 0) {
            throw new CustomValidationException("Item list cannot be empty");
        }
        Invoice inv = new Invoice();
        if (context != null) {
            User user = context.getUser();
            if (user != null) {
                inv.setUser(user);
                inv.setInvoiceDate(new Date());
                inv.setInvoiceStatus(SystemUtils.ACTIVE_STATUS);
                inv.setNetTotal(dto.getNetTotal());
                inv.setPayment(dto.getPayment());

//                List<InvoiceItem> itemList = new ArrayList<>();
////                for(InvoiceItemDTO i : dto.getInvoiceItemList()){
////                    InvoiceItem item =  new InvoiceItem();
////                    item.setInvoice(inv);
////                    item.setItemQty(i.getItemQty());
////                    item.setSubTotal(i.getSubTotal());
////                    item.setItemPrice(i.getItemPrice());
////                    Optional<ProductStock> byId = stockRepo.findById(i.getProductStockId());
////                    if(byId.get() != null){
////                        item.setProductStockId(byId.get());
////                    }
////                    itemList.add(item);
////                }
//                inv.setInvoiceItemList(itemList);
                Invoice save = invoiceRepo.save(inv);

                if (save != null) {

                    for (InvoiceItemDTO i : dto.getInvoiceItemList()) {
                        InvoiceItem item = new InvoiceItem();
                        item.setInvoice(save);
                        item.setItemQty(i.getItemQty());
                        item.setSubTotal(i.getSubTotal());
                        item.setItemPrice(i.getItemPrice());
                        Optional<ProductStock> byId = stockRepo.findById(i.getProductStockId());
                        if (byId.get() != null) {
                            item.setProductStockId(byId.get());
                        }
                        invoiceItemRepo.save(item);
                    }

                    InvoiceDTO savedDto = convertEntityToDto(save);
                    resp.setData(savedDto);
                    resp.setMessage("Successfully Saved");
                }else{
                    resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                    resp.setMessage("Insertion Error");
                }
            } else {
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
                resp.setMessage("Context not found");
            }
        } else {
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            resp.setMessage("Context not found");
        }
        return resp;
    }

    @Override
    public ResponseDTO<List<InvoiceDTO>> getAllActiveInvoices() {
        ResponseDTO<List<InvoiceDTO>> resp = new ResponseDTO<>();
        List<Invoice> invoiceList = invoiceRepo.findAllByInvoiceStatus(SystemUtils.ACTIVE_STATUS);
        List<InvoiceDTO> dtoList = invoiceList.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
        resp.setData(dtoList);
        return resp;
    }

    @Override
    public ResponseDTO<?> deleteInvoice(int id) {
        ResponseDTO<?> resp = new ResponseDTO<>();
        Optional<Invoice> byId = invoiceRepo.findById(id);
        Invoice invoice = byId.get();
        if (invoice != null) {
            invoice.setInvoiceStatus(SystemUtils.DEACTIVE_STATUS);
            invoiceRepo.save(invoice);
            resp.setMessage("Successfully Deleted");
        } else {
            resp.setMessage("Invoice not found for given ID");
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
        }
        return resp;
    }

    @Override
    public Invoice convertDtoToEntity(InvoiceDTO dto) {
        Invoice inv = new Invoice();
        return inv;
    }

    @Override
    public InvoiceDTO convertEntityToDto(Invoice entity) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.setInvoiceId(entity.getInvoiceId());
        dto.setInvoiceStatus(entity.getInvoiceStatus());
        dto.setPayment(entity.getPayment());
        dto.setNetTotal(entity.getNetTotal());

        User user = entity.getUser();
        UserDTO userDto = userService.convertToDTO(user);
        userDto.setUserPassword(null);
        dto.setUser(userDto);

        List<InvoiceItem> itemList = entity.getInvoiceItemList();
        List<InvoiceItemDTO> itemDtoList = new ArrayList<>();
        if (itemList == null) {
            Query q = em.createNativeQuery("select * from invoice_item where invoice_id = '" + entity.getInvoiceId() + "' ", InvoiceItem.class);
            itemList = q.getResultList();
        }
        if (itemList != null && itemList.size() > 0) {
            itemDtoList = itemList.stream()
                    .map(this::convertInvoiceItemIntoDto)
                    .collect(Collectors.toList());
        }
        dto.setInvoiceItemList(itemDtoList);

        dto.setInvoiceDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(entity.getInvoiceDate()));
        return dto;
    }

    public InvoiceItemDTO convertInvoiceItemIntoDto(InvoiceItem inv) {
        InvoiceItemDTO dto = new InvoiceItemDTO();
        dto.setItemId(inv.getItemId());
        dto.setItemQty(inv.getItemQty());
        dto.setItemPrice(inv.getItemPrice());
        dto.setSubTotal(inv.getSubTotal());

        ProductStock stock = inv.getProductStockId();
        dto.setProductStockId(stock.getProductStockId());

        dto.setProductName(stock.getProductId().getProductName());
        dto.setProductId(stock.getProductId().getProductId());
        return dto;
    }
}


