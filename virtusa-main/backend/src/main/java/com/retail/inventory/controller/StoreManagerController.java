package com.retail.inventory.controller;

import com.retail.inventory.model.*;
import com.retail.inventory.repository.*;
import com.retail.inventory.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/store-manager")
@CrossOrigin(origins = "http://localhost:4200")
public class StoreManagerController {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    @Autowired
    private PurchaseOrderRepository poRepository;
    
    @Autowired
    private DashboardService dashboardService;

    // --- Dashboard ---
    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        return dashboardService.getManagerDashboardStats();
    }

    @GetMapping("/dashboard/notifications")
    public List<Notification> getNotifications() {
        return dashboardService.getRecentNotifications(1L); // Mock user ID
    }

    // --- Product Management ---
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/products/scan/{sku}")
    public Product scanProduct(@PathVariable String sku) {
        return productRepository.findBySku(sku);
    }

    // --- Inventory ---
    @GetMapping("/inventory/summary")
    public Map<String, Long> getInventorySummary() {
        return Map.of(
            "available", inventoryRepository.countByQuantityGreaterThan(0),
            "low", inventoryRepository.countLowStock(),
            "damaged", 12L // Mock damaged count
        );
    }

    // --- Purchase Orders ---
    @GetMapping("/orders")
    public List<PurchaseOrder> getOrders() {
        return poRepository.findAll();
    }

    @PostMapping("/orders")
    public PurchaseOrder createOrder(@RequestBody PurchaseOrder order) {
        order.setStatus("PENDING");
        return poRepository.save(order);
    }

    // --- Reports ---
    @GetMapping("/reports/generate-pdf")
    public byte[] generateReportPdf(@RequestParam String range) {
        // Mock PDF generation byte array
        return new byte[0];
    }
}
