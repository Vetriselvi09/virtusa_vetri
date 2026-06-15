import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { WarehouseService } from '../services/warehouse.service';
import { WarehouseStats, StockTransaction } from '../models/warehouse.models';

@Component({
  selector: 'app-warehouse-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, StatCardComponent],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1>Warehouse Overview</h1>
          <p>Monitor stock receipts, inventory levels, and dispatch status.</p>
        </div>
        <div class="quick-actions">
           <button class="action-btn" routerLink="../stock-receipt">
            <lucide-icon name="PackagePlus" [size]="18"></lucide-icon> Receive Product
          </button>
          <button class="action-btn" routerLink="../inventory-updates">
            <lucide-icon name="RefreshCw" [size]="18"></lucide-icon> Update Stock
          </button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="stats-grid" *ngIf="stats">
        <app-stat-card 
          label="Total Products Received" 
          [value]="stats.receivedProducts" 
          icon="Package" 
          iconBg="rgba(0, 137, 123, 0.1)" 
          iconColor="#00897b">
        </app-stat-card>
        <app-stat-card 
          label="Current Stock Available" 
          [value]="stats.availableStock" 
          icon="Database" 
          iconBg="rgba(59, 130, 246, 0.1)" 
          iconColor="#3b82f6">
        </app-stat-card>
        <app-stat-card 
          label="Low Stock Products" 
          [value]="stats.lowStockItems" 
          icon="AlertTriangle" 
          iconBg="rgba(239, 68, 68, 0.1)" 
          iconColor="#ef4444">
        </app-stat-card>
        <app-stat-card 
          label="Today's Dispatches" 
          [value]="stats.todayDispatches" 
          icon="Truck" 
          iconBg="rgba(16, 185, 129, 0.1)" 
          iconColor="#10b981">
        </app-stat-card>
      </div>

      <div class="dashboard-layout">
        <div class="left-col">
          <!-- Inventory Visualization -->
          <div class="card viz-card premium-shadow">
            <div class="card-header">
              <h3>Inventory Trends</h3>
              <div class="filter-pills">
                <button [class.active]="viewRange === 10" (click)="viewRange = 10">10 Days</button>
                <button [class.active]="viewRange === 30" (click)="viewRange = 30">30 Days</button>
              </div>
            </div>
            <div class="viz-content">
              <div class="custom-chart">
                 <div *ngFor="let bar of chartData" 
                     class="bar-wrap" 
                     [style.height.%]="bar.val">
                  <div class="bar" [title]="bar.label + ': ' + bar.val"></div>
                  <span>{{bar.label}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Table -->
          <div class="card table-card premium-shadow">
            <div class="card-header">
              <h3>Recent Stock Activities</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let tr of transactions">
                  <td><strong>{{tr.productName}}</strong></td>
                  <td>{{tr.receivedDate}}</td>
                  <td>{{tr.quantity}}</td>
                  <td>
                    <span class="status-badge" [class]="tr.status.toLowerCase()">{{tr.status}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="right-col">
          <!-- Notification Panel -->
          <div class="card info-card premium-shadow">
            <div class="card-header">
              <h3>Warehouse Alerts</h3>
              <span class="badge danger">4 New</span>
            </div>
            <div class="notif-list">
              <div *ngFor="let n of notifications" class="n-item">
                <div class="n-icon" [class]="n.type">
                  <lucide-icon [name]="n.icon" [size]="18"></lucide-icon>
                </div>
                <div class="n-text">
                  <p>{{n.msg}}</p>
                  <small>{{n.time}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    .page-header p { color: var(--text-muted); margin: 8px 0 0 0; }

    .quick-actions { display: flex; gap: 16px; }
    .action-btn { 
      padding: 12px 24px; border-radius: 16px; border: 1px solid var(--border); 
      background: #fff; display: flex; align-items: center; gap: 12px; 
      font-weight: 700; color: var(--text-main); cursor: pointer; transition: 0.3s;
    }
    .action-btn:hover { background: var(--bg-main); color: var(--primary); transform: translateY(-3px); border-color: var(--primary); }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }

    .dashboard-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; }
    .left-col, .right-col { display: flex; flex-direction: column; gap: 32px; }

    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .card-header h3 { margin: 0; font-size: 1.25rem; font-weight: 850; color: var(--secondary); }

    .filter-pills { display: flex; background: var(--bg-main); padding: 4px; border-radius: 12px; }
    .filter-pills button { border: none; padding: 6px 14px; border-radius: 10px; font-weight: 800; cursor: pointer; background: transparent; color: var(--text-muted); }
    .filter-pills button.active { background: #fff; color: var(--primary); }

    .viz-content { height: 240px; display: flex; align-items: flex-end; padding-top: 20px; }
    .custom-chart { display: flex; width: 100%; height: 100%; align-items: flex-end; gap: 12px; }
    .bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
    .bar { width: 100%; background: var(--primary); border-radius: 8px 8px 0 0; opacity: 0.85; transition: 0.3s; }
    .bar:hover { opacity: 1; transform: scaleY(1.05); }
    .bar-wrap span { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px; color: var(--text-muted); font-size: 0.85rem; border-bottom: 1px solid var(--border); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; font-size: 0.95rem; }

    .status-badge { padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; }
    .status-badge.received { background: #ecfdf5; color: #047857; }
    .status-badge.updated { background: #eff6ff; color: #1d4ed8; }
    .status-badge.returned { background: #fef2f2; color: #b91c1c; }

    .notif-list { display: flex; flex-direction: column; gap: 16px; }
    .n-item { display: flex; gap: 16px; padding: 16px; border-radius: 20px; background: #f8fafc; transition: 0.2s; }
    .n-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .n-icon.alert { background: #fef2f2; color: #ef4444; }
    .n-icon.success { background: #ecfdf5; color: #10b981; }
    .n-text p { margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-main); }
    .n-text small { color: var(--text-muted); font-weight: 600; }

    .badge.danger { background: var(--danger); color: #fff; padding: 4px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; }
    
    @media (max-width: 1400px) { .dashboard-layout { grid-template-columns: 1fr; } }
  `]
})
export class WarehouseDashboardComponent implements OnInit {
  stats?: WarehouseStats;
  transactions: StockTransaction[] = [];
  viewRange = 10;
  chartData = [
    { label: 'Jun 01', val: 70 }, { label: 'Jun 03', val: 45 }, { label: 'Jun 05', val: 85 },
    { label: 'Jun 07', val: 30 }, { label: 'Jun 09', val: 60 }, { label: 'Jun 11', val: 95 }
  ];

  notifications = [
    { msg: 'New stock order #9401 arrived', time: '10m ago', icon: 'Package', type: 'success' },
    { msg: 'Product return initiated for #SKU-202', time: '1h ago', icon: 'Undo2', type: 'alert' },
    { msg: 'Inventory updated successfully', time: '3h ago', icon: 'CheckCircle', type: 'success' },
    { msg: 'Dispatch delayed: North Route', time: '5h ago', icon: 'Clock', type: 'alert' }
  ];

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.warehouseService.getStats().subscribe(s => this.stats = s);
    this.warehouseService.getRecentTransactions().subscribe(t => this.transactions = t);
  }
}
