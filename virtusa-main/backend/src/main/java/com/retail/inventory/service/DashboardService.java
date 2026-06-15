package com.retail.inventory.service;

import com.retail.inventory.model.Notification;
import java.util.List;
import java.util.Map;

public interface DashboardService {
    Map<String, Object> getManagerDashboardStats();
    List<Notification> getRecentNotifications(Long userId);
}
