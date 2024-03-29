package com.example.invoicecrudbackend.Repository;

import com.example.invoicecrudbackend.Entity.Invoice;
//import com.example.invoicecrudbackend.Entity.InvoiceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
//@RepositoryRestResource(excerptProjection = InvoiceProjection.class)
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
}
