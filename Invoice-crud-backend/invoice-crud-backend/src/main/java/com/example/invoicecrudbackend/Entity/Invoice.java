package com.example.invoicecrudbackend.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import java.time.Instant;
import java.time.LocalDate;

@Data
@Entity

public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long invoiceNumber;

    @Min(value = 0)
    @Max(value = 4000)
    private Float price;

    @NotNull
    @NotEmpty
    @Length (min=3, max = 20, message = "Product name should have 3-20 character")
    private String customerName;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private LocalDate invoiceDate;

    @CreatedDate
    @Column(updatable = false)
    private Instant CreateAt;
    @LastModifiedDate
    private Instant updateAt;

}
