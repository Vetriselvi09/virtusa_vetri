package com.retail.inventory.repository;

import com.retail.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Long countByQuantityGreaterThan(int quantity);

    @Query("SELECT COUNT(i) FROM Inventory i WHERE i.quantity <= i.reorderLevel")
    Long countLowStock();
}
