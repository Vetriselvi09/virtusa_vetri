package com.retail.inventory.service.impl;

import com.retail.inventory.model.Notification;
import com.retail.inventory.repository.InventoryRepository;
import com.retail.inventory.repository.NotificationRepository;
import com.retail.inventory.repository.ProductRepository;
import com.retail.inventory.repository.PurchaseOrderRepository;
import com.retail.inventory.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Map<String, Object> getManagerDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalProducts",
                productRepository.count());

        stats.put("totalStock",
                inventoryRepository.countByQuantityGreaterThan(0));

        stats.put("lowStock",
                inventoryRepository.countLowStock());

        stats.put("totalOrders",
                purchaseOrderRepository.count());

        return stats;
    }

    @Override
    public List<Notification> getRecentNotifications(Long userId) {

        return notificationRepository.findAll();
    }

    @Override
    public Map<String, Object> getReportSummary() {

        Map<String, Object> report = new HashMap<>();

        report.put("totalProducts",
                productRepository.count());

        report.put("totalInventoryItems",
                inventoryRepository.count());

        report.put("availableStockItems",
                inventoryRepository.countByQuantityGreaterThan(0));

        report.put("lowStockItems",
                inventoryRepository.countLowStock());

        report.put("totalOrders",
                purchaseOrderRepository.count());

        return report;
    }
}