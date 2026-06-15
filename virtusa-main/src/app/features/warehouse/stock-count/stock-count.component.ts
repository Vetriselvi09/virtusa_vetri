import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { WarehouseService } from '../services/warehouse.service';
import { InventoryItem } from '../models/warehouse.models';

@Component({
  selector: 'app-stock-count',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="count-page">
      <div class="page-header">
        <div>
          <h1>Stock Count Verification</h1>
          <p>Reconcile physical warehouse stock with digital inventory records.</p>
        </div>
        <div class="header-actions">
           <button class="btn-primary" (click)="submitAll()">
            <lucide-icon name="CheckCircle" [size]="18"></lucide-icon> Submit Verification
          </button>
        </div>
      </div>

       <!-- Summary Cards -->
       <div class="stats-grid">
        <div class="card status-card premium-shadow">
          <div class="meta">Total Items Counted</div>
          <h2>{{countedItems}}</h2>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Missing Stock</div>
          <h2 class="danger">{{missingStock}}</h2>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Overstock</div>
          <h2 class="warn">{{overstock}}</h2>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Pending Verification</div>
          <h2 class="primary">{{pendingCount}}</h2>
        </div>
      </div>

      <div class="card table-card premium-shadow">
        <div class="card-header">
           <h3>Inventory Audit Table</h3>
           <div class="search-box">
              <lucide-icon name="Search" [size]="18"></lucide-icon>
              <input type="text" placeholder="Search product...">
           </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>System Quantity</th>
              <th>Physical Quantity</th>
              <th>Difference</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of auditList">
              <td><strong>{{item.name}}</strong></td>
              <td>{{item.systemQty}}</td>
              <td>
                <input type="number" [(ngModel)]="item.physicalQty" class="count-input">
              </td>
              <td [class.error]="item.physicalQty - item.systemQty < 0" 
                  [class.success]="item.physicalQty - item.systemQty > 0">
                {{item.physicalQty - item.systemQty > 0 ? '+' : ''}}{{item.physicalQty - item.systemQty}}
              </td>
              <td>
                <span class="status-badge" [class]="getStatusClass(item)">
                  {{getStatusText(item)}}
                </span>
              </td>
              <td>
                <button class="btn-verify" (click)="verifyItem(item)">
                   <lucide-icon name="Check" [size]="16"></lucide-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .count-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .status-card { text-align: center; }
    .status-card h2 { font-size: 2rem; font-weight: 900; margin: 10px 0; color: var(--secondary); }
    .status-card h2.danger { color: var(--danger); }
    .status-card h2.warn { color: var(--warning); }
    .status-card h2.primary { color: var(--primary); }
    .status-card .meta { font-weight: 800; color: var(--text-muted); font-size: 0.85rem; }

    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    
    .search-box { background: var(--bg-main); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; width: 240px; }
    .search-box input { border: none; background: transparent; outline: none; flex: 1; }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px; border-bottom: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; font-size: 0.95rem; }

    .count-input { width: 80px; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; text-align: center; font-weight: 700; outline: none; transition: 0.2s; }
    .count-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0, 137, 123, 0.1); }

    .status-badge { padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.correct { background: #ecfdf5; color: #047857; }
    .status-badge.mismatch { background: #fffbeb; color: #b45309; }
    .status-badge.missing { background: #fef2f2; color: #b91c1c; }

    .error { color: var(--danger); font-weight: 800; }
    .success { color: var(--success); font-weight: 800; }

    .btn-verify { width: 32px; height: 32px; border-radius: 8px; border: none; background: #f1f5f9; cursor: pointer; transition: 0.2s; }
    .btn-verify:hover { background: var(--primary); color: #fff; }

    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 10px; }
  `]
})
export class StockCountComponent implements OnInit {
  auditList: any[] = [];
  countedItems = 0;
  missingStock = 0;
  overstock = 0;
  pendingCount = 0;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.warehouseService.getInventory().subscribe(items => {
      this.auditList = items.map(i => ({
        name: i.name,
        systemQty: i.quantity,
        physicalQty: i.quantity,
        verified: false
      }));
      this.updateStats();
    });
  }

  getStatusClass(item: any) {
    const diff = item.physicalQty - item.systemQty;
    if (diff === 0) return 'correct';
    if (diff < 0) return 'missing';
    return 'mismatch';
  }

  getStatusText(item: any) {
    const diff = item.physicalQty - item.systemQty;
    if (diff === 0) return 'Correct';
    if (diff < 0) return 'Missing Stock';
    return 'Overstock';
  }

  verifyItem(item: any) {
    item.verified = true;
    this.updateStats();
  }

  updateStats() {
    this.countedItems = this.auditList.filter(i => i.verified).length;
    this.pendingCount = this.auditList.length - this.countedItems;
    this.missingStock = this.auditList.filter(i => i.physicalQty < i.systemQty).length;
    this.overstock = this.auditList.filter(i => i.physicalQty > i.systemQty).length;
  }

  submitAll() {
    alert('Stock verification submitted to management. \nCorrect: ' + (this.auditList.length - this.missingStock - this.overstock) + ' \nMismatches: ' + (this.missingStock + this.overstock));
  }
}
