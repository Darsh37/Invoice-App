package com.example.invoicecrudbackend.Controller;

import com.example.invoicecrudbackend.Entity.Invoice;
import com.example.invoicecrudbackend.Service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class InvoiceController {
    @Autowired
    public InvoiceService invoiceService;

    @PostMapping("/invoices")
    //@RequrestBody annototion will convert the JSON data
    //coming in the request body into the object of the class product
    public ResponseEntity<?> addProduct(@RequestBody @Valid Invoice newInvoice, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please add proper details");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(this.invoiceService.addInvoice(newInvoice));
    }
    @GetMapping("/invoices")
    public ResponseEntity<?> getInvoiceDetails(){
        return ResponseEntity.status(HttpStatus.OK).body(this.invoiceService.getAll());
    }

    //Read single
    @GetMapping("/invoices/{invoiceNumber}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Long invoiceNumber){
        Optional<Invoice> foundInvoice = this.invoiceService.getById(invoiceNumber);
        if(foundInvoice == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invoice with this Number does not exist");
        else
            return ResponseEntity.ok(foundInvoice);

    }

    @DeleteMapping("/invoices/{invoiceNumber}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Long invoiceNumber){
        Optional<Invoice> foundInvoice = this.invoiceService.getById(invoiceNumber);
        if(foundInvoice== null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invoice with this Number does not exist");
        else
        {
            this.invoiceService.deleteInvoice(invoiceNumber);
            //When the delete operation is done we don't
            //want to return any response
            return ResponseEntity.ok("Invoice delete successfully");
        }
    }
    @PutMapping("/invoices/{invoiceNumber}")
    public ResponseEntity<?> updateInvoice(@PathVariable Long invoiceNumber, @RequestBody Invoice updateInvoice){
       Optional<Invoice> foundInvoice = this.invoiceService.getById(invoiceNumber);
        if(foundInvoice == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invoice with this Number does not exist");
        else
            return ResponseEntity.ok(this.invoiceService.UpdateInvoice(invoiceNumber, updateInvoice));

    }
}
