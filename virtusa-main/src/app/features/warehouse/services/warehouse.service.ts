import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WarehouseStats, StockTransaction, StockReceipt, InventoryItem, DispatchItem, ReturnItem } from '../models/warehouse.models';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private mockStats: WarehouseStats = {
    receivedProducts: '2,480',
    availableStock: '18,250',
    lowStockItems: '12',
    todayDispatches: '145'
  };

  private mockTransactions: StockTransaction[] = [
    { productName: 'iPhone 15 Pro', receivedDate: 'Jun 12, 2024', quantity: 50, status: 'Received' },
    { productName: 'MacBook Air M3', receivedDate: 'Jun 11, 2024', quantity: 15, status: 'Updated' },
    { productName: 'Pixel 8 Pro', receivedDate: 'Jun 10, 2024', quantity: 5, status: 'Returned' }
  ];

  getStats(): Observable<WarehouseStats> {
    return of(this.mockStats);
  }

  getRecentTransactions(): Observable<StockTransaction[]> {
    return of(this.mockTransactions);
  }

  // --- Stock Receipts ---
  getReceipts(): Observable<StockReceipt[]> {
    return of([
      { productId: 'SKU-001', productName: 'iPhone 15 Pro', supplier: 'Tech Supply Co.', quantity: 50, date: '2024-06-12', status: 'Good' },
      { productId: 'SKU-005', productName: 'Samsung S24', supplier: 'Global Logistics', quantity: 10, date: '2024-06-12', status: 'Pending' }
    ]);
  }

  // --- Inventory ---
  getInventory(): Observable<InventoryItem[]> {
    return of([
      { id: '1', name: 'iPhone 15 Pro', category: 'Mobile', quantity: 45, price: 109900, lastUpdated: '2 mins ago', status: 'In Stock', location: 'Section A-12', supplier: 'Apple India' },
      { id: '2', name: 'Galaxy S24 Ultra', category: 'Mobile', quantity: 8, price: 129900, lastUpdated: '15 mins ago', status: 'Low Stock', location: 'Section B-04', supplier: 'Samsung Logistics' }
    ]);
  }

  // --- Dispatch ---
  getDispatches(): Observable<DispatchItem[]> {
    return of([
      { id: 'DSP-901', product: 'MacBook Air', qty: 5, destination: 'Mumbai Central', status: 'In Transit', date: '2024-06-12' },
      { id: 'DSP-899', product: 'AirPods Pro', qty: 25, destination: 'Delhi Digital', status: 'Packed', date: '2024-06-12' }
    ]);
  }

  getReturns(): Observable<ReturnItem[]> {
    return of([
      { id: 'RET-041', product: 'Broken iPad', qty: 1, reason: 'Damaged on arrival', condition: 'Damaged', date: '2024-06-11', status: 'Pending' }
    ]);
  }
}
