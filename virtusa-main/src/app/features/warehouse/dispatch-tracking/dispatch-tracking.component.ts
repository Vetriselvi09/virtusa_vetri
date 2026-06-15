import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { WarehouseService } from '../services/warehouse.service';
import { DispatchItem, ReturnItem } from '../models/warehouse.models';

@Component({
  selector: 'app-dispatch-tracking',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="dispatch-page">
      <div class="page-header">
        <div>
          <h1>Dispatch & Returns</h1>
          <p>Manage outgoing shipments and process incoming returns.</p>
        </div>
      </div>

       <!-- Summary Cards -->
       <div class="stats-grid">
        <div class="card status-card premium-shadow">
          <div class="meta">Pending Dispatch</div>
          <h2>14</h2>
          <p>Ready to ship</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Completed Dispatch</div>
          <h2 class="success">145</h2>
          <p>Delivered today</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Return Requests</div>
          <h2 class="warn">8</h2>
          <p>Awaiting inspection</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Returned Products</div>
          <h2 class="danger">12</h2>
          <p>Processed this month</p>
        </div>
      </div>

      <!-- Dispatch Tracking Section -->
      <div class="card table-card premium-shadow section">
        <div class="card-header">
           <h3>Dispatch Tracking</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Dispatch ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of dispatches">
              <td>#{{d.id}}</td>
              <td><strong>{{d.product}}</strong></td>
              <td>{{d.qty}}</td>
              <td>{{d.destination}}</td>
              <td>
                <span class="status-badge" [class]="d.status.toLowerCase().replace(' ', '-')">{{d.status}}</span>
              </td>
              <td>{{d.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="returns-container section">
        <div class="section-title">
           <h2>Return Handling</h2>
        </div>

        <div class="returns-grid">
          <!-- Return Form -->
          <div class="card form-card premium-shadow">
            <div class="card-header">
              <h3>Process New Return</h3>
            </div>
            <div class="form">
              <div class="field">
                <label>Return ID</label>
                <input type="text" [(ngModel)]="returnForm.id" placeholder="RET-XXXX">
              </div>
              <div class="field">
                <label>Product Name</label>
                <input type="text" [(ngModel)]="returnForm.product">
              </div>
              <div class="field">
                <label>Quantity Returned</label>
                <input type="number" [(ngModel)]="returnForm.qty">
              </div>
              <div class="field">
                <label>Return Reason</label>
                <select [(ngModel)]="returnForm.reason">
                  <option value="Damaged">Damaged</option>
                  <option value="Wrong Product">Wrong Product</option>
                  <option value="Expired">Expired</option>
                  <option value="Customer Return">Customer Return</option>
                </select>
              </div>
              <div class="form-actions">
                <button class="btn-outline">Reject</button>
                <button class="btn-primary" (click)="acceptReturn()">Accept Return</button>
              </div>
            </div>
          </div>

          <!-- Return History -->
          <div class="card history-card premium-shadow">
            <div class="card-header">
              <h3>Recent Returns</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Return ID</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of returns">
                  <td>#{{r.id}}</td>
                  <td><strong>{{r.product}}</strong></td>
                  <td>{{r.qty}}</td>
                  <td>
                    <span class="status-badge" [class]="r.status.toLowerCase()">{{r.status}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dispatch-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .status-card { text-align: center; }
    .status-card h2 { font-size: 2rem; font-weight: 900; margin: 10px 0; color: var(--secondary); }
    .status-card h2.success { color: var(--success); }
    .status-card h2.warn { color: var(--warning); }
    .status-card h2.danger { color: var(--danger); }
    .status-card .meta { font-weight: 800; color: var(--text-muted); font-size: 0.85rem; }

    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .section-title { margin-top: 16px; margin-bottom: 24px; border-left: 6px solid var(--primary); padding-left: 16px; }
    .section-title h2 { margin: 0; color: var(--secondary); font-size: 1.5rem; font-weight: 900; }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px; border-bottom: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; font-size: 0.95rem; }

    .status-badge { padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.delivered { background: #ecfdf5; color: #047857; }
    .status-badge.in-transit { background: #eff6ff; color: #1d4ed8; }
    .status-badge.packed { background: #f8fafc; color: var(--text-muted); }
    .status-badge.delayed { background: #fef2f2; color: #b91c1c; }
    .status-badge.pending { background: #fffbeb; color: #b45309; }

    .returns-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; }
    .form { display: flex; flex-direction: column; gap: 16px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    .field label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .field input, .field select { padding: 12px; border-radius: 12px; border: 1px solid var(--border); outline: none; transition: 0.2s; }
    .field input:focus { border-color: var(--primary); }

    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }
    .btn-outline { background: #fff; border: 1px solid var(--border); padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; }

    @media (max-width: 1200px) { .returns-grid { grid-template-columns: 1fr; } }
  `]
})
export class DispatchTrackingComponent implements OnInit {
  dispatches: DispatchItem[] = [];
  returns: ReturnItem[] = [];
  
  returnForm = { id: '', product: '', qty: 1, reason: 'Damaged' };

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.warehouseService.getDispatches().subscribe(d => this.dispatches = d);
    this.warehouseService.getReturns().subscribe(r => this.returns = r);
  }

  acceptReturn() {
    const newItem: ReturnItem = {
      id: this.returnForm.id || 'RET-' + Math.floor(Math.random()*1000),
      product: this.returnForm.product,
      qty: this.returnForm.qty,
      reason: this.returnForm.reason,
      condition: 'Damaged', // Mocked
      date: new Date().toISOString().substring(0, 10),
      status: 'Pending'
    };
    this.returns.unshift(newItem);
    this.returnForm = { id: '', product: '', qty: 1, reason: 'Damaged' };
  }
}
