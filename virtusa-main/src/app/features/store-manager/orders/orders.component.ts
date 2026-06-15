import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sm-orders',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="orders-page">
      <div class="page-header">
        <div>
          <h1>Purchase Orders</h1>
          <p>Create and track supplier orders dynamically.</p>
        </div>
        <div class="header-actions">
           <button class="btn-primary" (click)="showCreateModal = true">
            <lucide-icon name="Plus" [size]="18"></lucide-icon> Create Purchase Order
          </button>
        </div>
      </div>

       <!-- Dynamic Status Cards -->
       <div class="stats-grid">
        <div class="card status-card premium-shadow">
          <div class="meta">Active Orders</div>
          <h2>{{orderStats.active}}</h2>
          <p>Processing with suppliers</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Pending Approval</div>
          <h2>{{orderStats.pending}}</h2>
          <p>Awaiting management review</p>
        </div>
        <div class="card status-card premium-shadow">
          <div class="meta">Completed Orders</div>
          <h2>{{orderStats.completed}}</h2>
          <p>Fully received this month</p>
        </div>
      </div>

      <!-- Create PO Modal -->
      <div *ngIf="showCreateModal" class="modal-overlay">
        <div class="modal-card premium-shadow">
          <div class="modal-header">
            <h3>Create Purchase Order</h3>
            <button (click)="showCreateModal = false"><lucide-icon name="X" [size]="20"></lucide-icon></button>
          </div>
          <div class="form-grid">
            <div class="field full">
              <label>Select Supplier</label>
              <select [(ngModel)]="newPO.supplier">
                <option value="Tech Supply Co.">Tech Supply Co.</option>
                <option value="Global Logistics">Global Logistics</option>
              </select>
            </div>
            <div class="field">
              <label>Product Name</label>
              <input type="text" [(ngModel)]="newPO.product" placeholder="e.g. iPhone 15 Pro">
            </div>
            <div class="field">
              <label>Quantity</label>
              <input type="number" [(ngModel)]="newPO.qty">
            </div>
            <div class="field">
              <label>Unit Price (₹)</label>
              <input type="text" [(ngModel)]="newPO.price">
            </div>
            <div class="field">
              <label>Expected Delivery</label>
              <input type="date" [(ngModel)]="newPO.date">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-outline" (click)="showCreateModal = false">Save Draft</button>
            <button class="btn-primary" (click)="submitPO()">Create Order</button>
          </div>
        </div>
      </div>

      <div class="content-tabs">
        <div class="tabs">
          <button [class.active]="activeTab === 'active'" (click)="activeTab = 'active'">Active Orders</button>
          <button [class.active]="activeTab === 'history'" (click)="activeTab = 'history'">Order History</button>
        </div>

        <div class="card table-card premium-shadow">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Supplier</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let po of getVisibleOrders()">
                <td>#{{po.id}}</td>
                <td><strong>{{po.supplier}}</strong></td>
                <td>{{po.product}}</td>
                <td>{{po.qty}}</td>
                <td><strong>₹{{po.value}}</strong></td>
                <td><span class="status-badge" [class]="po.status.toLowerCase()">{{po.status}}</span></td>
                <td>{{po.date}}</td>
                <td>
                  <div class="actions">
                    <button class="icon-btn"><lucide-icon name="Eye" [size]="16"></lucide-icon></button>
                    <button class="icon-btn" *ngIf="po.status === 'Pending'"><lucide-icon name="Check" [size]="16"></lucide-icon></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-page { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.4s ease-out; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
    .page-header h1 { font-size: 1.75rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .status-card { text-align: center; padding: 24px; border-radius: 24px; background: #fff; display: flex; flex-direction: column; gap: 8px; }
    .status-card h2 { font-size: 2rem; font-weight: 900; margin: 0; color: var(--secondary); }
    .status-card .meta { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }

    .content-tabs { display: flex; flex-direction: column; gap: 16px; }
    .tabs { display: flex; gap: 8px; background: #fff; padding: 6px; border-radius: 14px; width: fit-content; border: 1px solid var(--border); }
    .tabs button { 
      padding: 10px 20px; border-radius: 10px; border: none; background: transparent; 
      font-weight: 700; color: var(--text-muted); cursor: pointer; transition: 0.2s;
    }
    .tabs button.active { background: var(--primary); color: #fff; box-shadow: 0 4px 10px rgba(0, 137, 123, 0.2); }

    .card { background: #fff; border-radius: 24px; padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px; font-size: 0.85rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; }

    .status-badge { padding: 5px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.delivered { background: #ecfdf5; color: #047857; }
    .status-badge.pending { background: #fffbeb; color: #b45309; }
    .status-badge.approved { background: #eff6ff; color: #1d4ed8; }

    /* Modal Styles */
    .modal-overlay { 
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
      z-index: 2000; display: flex; align-items: center; justify-content: center;
    }
    .modal-card { width: 520px; border-radius: 28px; padding: 32px; background: #fff; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .modal-header h3 { margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--secondary); }
    .modal-header button { background: transparent; border: none; cursor: pointer; color: var(--text-muted); }
    .modal-footer { margin-top: 32px; display: flex; justify-content: flex-end; gap: 12px; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    .field.full { grid-column: span 2; }
    .field label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .field input, .field select { padding: 12px; border-radius: 12px; border: 1px solid var(--border); outline: none; transition: 0.2s; }
    .field input:focus { border-color: var(--primary); }

    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; }
    .btn-outline { background: #fff; border: 1px solid var(--border); padding: 12px 24px; border-radius: 14px; cursor: pointer; font-weight: 700; }
  `]
})
export class OrdersComponent {
  activeTab = 'active';
  showCreateModal = false;
  
  orderStats = { active: '12', pending: '4', completed: '45' };

  newPO = { supplier: 'Tech Supply Co.', product: '', qty: 1, price: '', date: '' };

  orders = [
    { id: '9401', supplier: 'Tech Supply Co.', product: 'iPhone 15 Pro', qty: 50, value: '45,50,000', status: 'Pending', date: 'Jun 12, 2024' },
    { id: '9398', supplier: 'Global Logistics', product: 'Logistics Equipment', qty: 500, value: '1,20,000', status: 'Approved', date: 'Jun 10, 2024' },
    { id: '9395', supplier: 'Delhi Electronics', product: 'MacBook Air M3', qty: 10, value: '11,49,000', status: 'Delivered', date: 'Jun 05, 2024' },
    { id: '9390', supplier: 'Mumbai Tech', product: 'Galaxy S24', qty: 15, value: '1,19,900', status: 'Delivered', date: 'May 28, 2024' }
  ];

  getVisibleOrders() {
    return this.activeTab === 'active' 
      ? this.orders.filter(o => o.status !== 'Delivered') 
      : this.orders.filter(o => o.status === 'Delivered');
  }

  submitPO() {
    const newOrder = {
      id: Math.floor(Math.random() * 10000).toString(),
      supplier: this.newPO.supplier,
      product: this.newPO.product,
      qty: this.newPO.qty,
      value: (this.newPO.qty * (parseInt(this.newPO.price) || 0)).toLocaleString(),
      status: 'Pending',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    this.orders.unshift(newOrder);
    this.orderStats.pending = (parseInt(this.orderStats.pending) + 1).toString();
    this.showCreateModal = false;
    this.newPO = { supplier: 'Tech Supply Co.', product: '', qty: 1, price: '', date: '' };
  }
}
