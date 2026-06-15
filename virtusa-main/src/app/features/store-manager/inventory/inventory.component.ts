import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sm-inventory',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="inventory-page">
      <div class="page-header">
        <div>
          <h1>SupplySync Inventory</h1>
          <p>Real-time tracking of warehouse stock and movements.</p>
        </div>
      </div>

      <!-- 4 Dynamic Status Cards -->
      <div class="stats-grid">
        <div class="card status-card premium-shadow">
          <div class="meta"><span class="dot available"></span> Available Stock</div>
          <h2>{{invStats.available}}</h2>
          <p>Units ready for sale</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta"><span class="dot reserved"></span> Reserved</div>
          <h2>{{invStats.reserved}}</h2>
          <p>Locked in pending POs</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta"><span class="dot damaged"></span> Damaged</div>
          <h2>{{invStats.damaged}}</h2>
          <p>Awaiting QA/Replacement</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta"><span class="dot low"></span> Low Stock Items</div>
          <h2>{{invStats.low}}</h2>
          <p>Critical threshold reached</p>
        </div>
      </div>

      <div class="content-grid">
        <!-- Stock Table -->
        <div class="card table-card premium-shadow">
          <div class="card-header">
            <h3>Inventory Overview</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Stock Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of inventory" class="clickable-row">
                <td>
                  <div class="prod-cell">
                    <div class="p-icon gradient-bg">{{item.name[0]}}</div>
                    <strong>{{item.name}}</strong>
                  </div>
                </td>
                <td>{{item.category}}</td>
                <td><strong>{{item.quantity}}</strong></td>
                <td>
                   <span class="status-badge" [class]="item.status.toLowerCase()">{{item.status}}</span>
                </td>
                <td>{{item.updated}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="right-panel">
          <!-- Stock Movement History -->
          <div class="card movement-card premium-shadow">
            <div class="card-header">
              <h3>Stock Movement History</h3>
            </div>
            <div class="move-list">
              <div *ngFor="let m of movements" class="move-item">
                <div class="move-icon" [class]="m.type">
                  <lucide-icon [name]="m.type === 'In' ? 'ArrowDownLeft' : 'ArrowUpRight'" [size]="18"></lucide-icon>
                </div>
                <div class="move-body">
                  <p><strong>{{m.product}}</strong></p>
                  <small>{{m.reason}}</small>
                </div>
                <div class="move-meta">
                  <span class="qty" [class]="m.type">{{m.type === 'In' ? '+' : '-'}}{{m.qty}}</span>
                  <span class="time">{{m.time}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inventory-page { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.4s ease-out; }
    .page-header h1 { font-size: 1.75rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .status-card { text-align: center; display: flex; flex-direction: column; gap: 6px; }
    .status-card h2 { font-size: 2rem; font-weight: 900; margin: 0; color: var(--secondary); }
    .status-card .meta { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 8px; }
    .status-card p { font-size: 0.75rem; color: var(--text-muted); margin: 0; }

    .card { background: #fff; border-radius: 24px; padding: 24px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .dot.available { background: var(--success); }
    .dot.reserved { background: var(--primary); }
    .dot.damaged { background: var(--danger); }
    .dot.low { background: var(--warning); }

    .content-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; }
    .table-card { padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 14px; font-size: 0.85rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 14px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; }
    .prod-cell { display: flex; align-items: center; gap: 12px; }
    .p-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 0.75rem; }

    .status-badge { padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.healthy { background: #ecfdf5; color: #047857; }
    .status-badge.warning { background: #fffbeb; color: #b45309; }
    .status-badge.critical { background: #fef2f2; color: #b91c1c; }

    .move-list { display: flex; flex-direction: column; gap: 16px; }
    .move-item { display: flex; gap: 14px; align-items: center; padding: 14px; background: #f8fafc; border-radius: 16px; }
    .move-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .move-icon.In { background: #ecfdf5; color: var(--success); }
    .move-icon.Out { background: #fef2f2; color: var(--danger); }
    .move-body { flex: 1; }
    .move-body p { margin: 0; font-size: 0.85rem; }
    .move-meta { text-align: right; display: flex; flex-direction: column; }
    .qty { font-weight: 800; font-size: 0.9rem; }
    .qty.In { color: var(--success); }
    .qty.Out { color: var(--danger); }
    .time { font-size: 0.7rem; color: var(--text-muted); }

    @media (max-width: 1200px) { .content-grid { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: 1fr 1fr; } }
  `]
})
export class InventoryComponent {
  invStats = {
    available: '1,452',
    reserved: '320',
    damaged: '12',
    low: '24'
  };

  inventory = [
    { name: 'iPhone 15 Pro', category: 'Mobile', quantity: 45, status: 'Healthy', updated: '2 mins ago' },
    { name: 'Galaxy S24 Ultra', category: 'Mobile', quantity: 8, status: 'Warning', updated: '15 mins ago' },
    { name: 'Pixel 8 Pro', category: 'Mobile', quantity: 0, status: 'Critical', updated: '1 hour ago' },
    { name: 'MacBook Air M3', category: 'Laptop', quantity: 32, status: 'Healthy', updated: '3 hours ago' }
  ];

  movements = [
    { product: 'iPhone 15 Pro', type: 'In', reason: 'Supplier Delivery #9398', qty: 20, time: '10 mins ago' },
    { product: 'Galaxy S24 Ultra', type: 'Out', reason: 'Sales Order #SO-112', qty: 2, time: '45 mins ago' },
    { product: 'AirPods Pro', type: 'In', reason: 'Stock Adjust (Audit)', qty: 5, time: '2 hours ago' }
  ];
}
