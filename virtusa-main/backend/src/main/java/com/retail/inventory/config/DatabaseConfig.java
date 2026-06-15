package com.retail.inventory.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig {
    // Standard JPA Configuration is driven by application.properties.
    // This class enables explicit transaction management.
}
