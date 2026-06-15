export interface WarehouseStats {
  receivedProducts: string;
  availableStock: string;
  lowStockItems: string;
  todayDispatches: string;
}

export interface StockTransaction {
  productName: string;
  receivedDate: string;
  quantity: number;
  status: 'Received' | 'Updated' | 'Returned';
}

export interface StockReceipt {
  productId: string;
  productName: string;
  supplier: string;
  quantity: number;
  date: string;
  status: 'Good' | 'Damaged' | 'Pending';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location?: string;
  supplier?: string;
}

export interface DispatchItem {
  id: string;
  product: string;
  qty: number;
  destination: string;
  status: 'Packed' | 'In Transit' | 'Delivered' | 'Delayed';
  date: string;
}

export interface ReturnItem {
  id: string;
  product: string;
  qty: number;
  reason: string;
  condition: 'Damaged' | 'Wrong Product' | 'Expired' | 'Customer Return';
  date: string;
  status: 'Pending' | 'Processed';
}
