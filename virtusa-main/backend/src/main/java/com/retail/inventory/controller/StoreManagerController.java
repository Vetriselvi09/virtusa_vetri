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

    // ---------------- Dashboard ----------------

    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        return dashboardService.getManagerDashboardStats();
    }

    @GetMapping("/dashboard/notifications")
    public List<Notification> getNotifications() {
        return dashboardService.getRecentNotifications(1L);
    }

    // ---------------- Product Management ----------------

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {

        Product savedProduct = productRepository.save(product);

        Inventory inventory = new Inventory();
        inventory.setProduct(savedProduct);
        inventory.setQuantity(0);
        inventory.setReorderLevel(10);

        inventoryRepository.save(inventory);

        return savedProduct;
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setSku(updatedProduct.getSku());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setBrand(updatedProduct.getBrand());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setSupplier(updatedProduct.getSupplier());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());
        existingProduct.setQrCodeData(updatedProduct.getQrCodeData());

        return productRepository.save(existingProduct);
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {

        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }

    @GetMapping("/products/scan/{sku}")
    public Product scanProduct(@PathVariable String sku) {
        return productRepository.findBySku(sku);
    }

    // ---------------- Inventory ----------------

    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/summary")
    public Map<String, Long> getInventorySummary() {

        return Map.of(
                "available",
                inventoryRepository.countByQuantityGreaterThan(0),

                "low",
                inventoryRepository.countLowStock(),

                "damaged",
                12L
        );
    }

    @PutMapping("/inventory/{id}")
    public Inventory updateInventory(
            @PathVariable Long id,
            @RequestBody Inventory updatedInventory) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));

        inventory.setQuantity(updatedInventory.getQuantity());
        inventory.setReorderLevel(updatedInventory.getReorderLevel());

        return inventoryRepository.save(inventory);
    }

    // ---------------- Purchase Orders ----------------

    @GetMapping("/orders")
    public List<PurchaseOrder> getOrders() {
        return poRepository.findAll();
    }

    @GetMapping("/orders/{id}")
    public PurchaseOrder getOrderById(@PathVariable Long id) {

        return poRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }

    @PostMapping("/orders")
    public PurchaseOrder createOrder(@RequestBody PurchaseOrder order) {

        order.setStatus("PENDING");

        return poRepository.save(order);
    }

    @PutMapping("/orders/{id}")
    public PurchaseOrder updateOrder(
            @PathVariable Long id,
            @RequestBody PurchaseOrder updatedOrder) {

        PurchaseOrder existingOrder = poRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        existingOrder.setSupplier(updatedOrder.getSupplier());
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setDeliveryDate(updatedOrder.getDeliveryDate());
        existingOrder.setTotalAmount(updatedOrder.getTotalAmount());

        return poRepository.save(existingOrder);
    }

    @DeleteMapping("/orders/{id}")
    public String deleteOrder(@PathVariable Long id) {

        if (!poRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }

        poRepository.deleteById(id);

        return "Order deleted successfully";
    }

    // ---------------- Reports ----------------

    @GetMapping("/reports/summary")
    public Map<String, Object> getReportSummary() {
    return dashboardService.getReportSummary();
    }

    @GetMapping("/reports/generate-pdf")
    public byte[] generateReportPdf(@RequestParam String range) {
        return new byte[0];
    }
}