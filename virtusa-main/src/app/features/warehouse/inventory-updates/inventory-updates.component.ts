import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { WarehouseService } from '../services/warehouse.service';
import { InventoryItem } from '../models/warehouse.models';

@Component({
  selector: 'app-inventory-updates',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="inventory-page">
      <div class="page-header">
        <div>
          <h1>Inventory Updates</h1>
          <p>Quickly adjust stock levels and monitor changes.</p>
        </div>
      </div>

       <!-- Summary Cards -->
       <div class="stats-grid">
        <div class="card status-card premium-shadow">
          <div class="meta">Available Stock</div>
          <h2>18,250</h2>
          <p>Verified in system</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Low Stock Items</div>
          <h2 class="warn">12</h2>
          <p>Needs reordering</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Updated Today</div>
          <h2>145</h2>
          <p>By warehouse staff</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Out Of Stock</div>
          <h2 class="danger">4</h2>
          <p>Zero availability</p>
        </div>
      </div>

      <div class="content-grid">
        <!-- Inventory Table -->
        <div class="card inventory-card premium-shadow">
          <div class="card-header">
            <h3>Current Stock Overview</h3>
            <div class="search-box">
              <lucide-icon name="Search" [size]="18"></lucide-icon>
              <input type="text" placeholder="Search product...">
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of inventory" (click)="selectedItem = item">
                <td><strong>{{item.name}}</strong><br><small>{{item.id}}</small></td>
                <td>{{item.category}}</td>
                <td><strong>{{item.quantity}}</strong></td>
                <td>₹{{item.price.toLocaleString()}}</td>
                <td>
                   <span class="status-badge" [class]="item.status.toLowerCase().replace(' ', '-')">{{item.status}}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="icon-btn add" (confirm)="$event.stopPropagation()" (click)="updateStock(item, 1)">+</button>
                    <button class="icon-btn sub" (confirm)="$event.stopPropagation()" (click)="updateStock(item, -1)">-</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Details Drawer / Panel -->
        <div class="side-panel" *ngIf="selectedItem">
          <div class="card details-card premium-shadow">
            <div class="card-header">
              <h3>Product Details</h3>
              <button class="close-btn" (click)="selectedItem = null"><lucide-icon name="X" [size]="20"></lucide-icon></button>
            </div>
            <div class="item-meta">
              <div class="p-img gradient-bg">{{selectedItem.name[0]}}</div>
              <div class="p-info">
                <h4>{{selectedItem.name}}</h4>
                <p>{{selectedItem.id}}</p>
              </div>
            </div>
            <div class="detail-list">
              <div class="d-item"><span>Category</span><strong>{{selectedItem.category}}</strong></div>
              <div class="d-item"><span>Supplier</span><strong>{{selectedItem.supplier}}</strong></div>
              <div class="d-item"><span>Location</span><strong>{{selectedItem.location}}</strong></div>
              <div class="d-item"><span>Last Updated</span><strong>{{selectedItem.lastUpdated}}</strong></div>
            </div>
            
            <div class="movement-history">
              <h4>Stock Movement History</h4>
              <div class="timeline">
                <div class="t-item added">
                   <div class="t-dot"></div>
                   <div class="t-content"><strong>5 Units Added</strong><small>Jun 12, 10:30 AM</small></div>
                </div>
                <div class="t-item removed">
                   <div class="t-dot"></div>
                   <div class="t-content"><strong>2 Units Removed</strong><small>Jun 11, 04:15 PM</small></div>
                </div>
                <div class="t-item updated">
                   <div class="t-dot"></div>
                   <div class="t-content"><strong>Qty Restored (Audit)</strong><small>Jun 10, 09:00 AM</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inventory-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .status-card { text-align: center; }
    .status-card h2 { font-size: 2.2rem; font-weight: 900; margin: 10px 0; color: var(--secondary); }
    .status-card h2.warn { color: var(--warning); }
    .status-card h2.danger { color: var(--danger); }
    .status-card .meta { font-weight: 800; color: var(--text-muted); font-size: 0.85rem; }

    .content-grid { display: grid; grid-template-columns: 1fr 400px; gap: 32px; align-items: start; }
    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    
    .search-box { background: var(--bg-main); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; width: 240px; }
    .search-box input { border: none; background: transparent; outline: none; flex: 1; }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 14px; border-bottom: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; cursor: pointer; }
    tr:hover td { background: #f8fafc; }

    .status-badge { padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.in-stock { background: #ecfdf5; color: #047857; }
    .status-badge.low-stock { background: #fffbeb; color: #b45309; }
    .status-badge.out-of-stock { background: #fef2f2; color: #b91c1c; }

    .action-buttons { display: flex; gap: 8px; }
    .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: none; font-weight: 800; cursor: pointer; transition: 0.2s; }
    .icon-btn.add { background: #ecfdf5; color: #047857; }
    .icon-btn.sub { background: #fef2f2; color: #b91c1c; }
    .icon-btn:hover { transform: scale(1.1); filter: brightness(0.9); }

    .item-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .p-img { width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.5rem; font-weight: 900; }
    .p-info h4 { margin: 0; font-size: 1.25rem; font-weight: 800; }
    .p-info p { margin: 0; color: var(--text-muted); font-size: 0.85rem; }

    .detail-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
    .d-item { display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #f8fafc; }
    .d-item span { color: var(--text-muted); font-size: 0.9rem; }
    .d-item strong { color: var(--text-main); font-size: 0.9rem; }

    .movement-history h4 { margin: 0 0 16px 0; font-size: 1rem; font-weight: 850; }
    .timeline { display: flex; flex-direction: column; gap: 20px; }
    .t-item { display: flex; gap: 16px; position: relative; }
    .t-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); margin-top: 6px; }
    .t-item.added .t-dot { background: var(--success); }
    .t-item.removed .t-dot { background: var(--danger); }
    .t-item.updated .t-dot { background: #3b82f6; }
    .t-content { display: flex; flex-direction: column; }
    .t-content strong { font-size: 0.9rem; }
    .t-content small { font-size: 0.75rem; color: var(--text-muted); }

    @media (max-width: 1400px) { .content-grid { grid-template-columns: 1fr; } .side-panel { width: 100%; } }
  `]
})
export class InventoryUpdatesComponent implements OnInit {
  inventory: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.warehouseService.getInventory().subscribe(items => {
      this.inventory = items;
      if (items.length > 0) this.selectedItem = items[0];
    });
  }

  updateStock(item: InventoryItem, delta: number) {
    const newVal = item.quantity + delta;
    if (newVal >= 0) {
      item.quantity = newVal;
      // In a real app, call service.updateInventory(item.id, newVal)
    }
  }
}
