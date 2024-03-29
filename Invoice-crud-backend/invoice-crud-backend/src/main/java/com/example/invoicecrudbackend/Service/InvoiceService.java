package com.example.invoicecrudbackend.Service;

import com.example.invoicecrudbackend.Entity.Invoice;
import com.example.invoicecrudbackend.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InvoiceService {
    @Autowired
    public InvoiceRepository invoiceRepository;
    public Invoice addInvoice(Invoice newInvoice) {
        return invoiceRepository.save(newInvoice);
    }

    public Iterable<Invoice> getAll(){
        //values method return collection<product>
        //we can convert this into an List by creating
        //and Arraylist using it
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getById(Long invoiceNumber){
        Optional<Invoice> emp = invoiceRepository.findById(invoiceNumber);
        return emp;
    }
    public void deleteInvoice(Long invoiceNumber){
        this.invoiceRepository.deleteById(invoiceNumber);
    }
    public Invoice UpdateInvoice(Long invoiceNumber,Invoice updateInvoice){
        updateInvoice.setInvoiceNumber(invoiceNumber);
        return invoiceRepository.save(updateInvoice);
    }
}
