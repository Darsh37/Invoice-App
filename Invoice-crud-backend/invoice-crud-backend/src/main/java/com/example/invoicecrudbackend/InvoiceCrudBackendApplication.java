package com.example.invoicecrudbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication

public class InvoiceCrudBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(InvoiceCrudBackendApplication.class, args);
	}


}
