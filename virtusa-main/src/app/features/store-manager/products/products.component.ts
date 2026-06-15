import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sm-products',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="products-page">
      <div class="page-header">
        <div>
          <h1>Product Management</h1>
          <p>Register new devices and manage SupplySync inventory catalogue.</p>
        </div>
        <div class="header-actions">
          <button class="btn-outline" (click)="showScanner = true">
            <lucide-icon name="ScanLine" [size]="18"></lucide-icon> Scan QR
          </button>
          <button class="btn-primary" (click)="showAddModal = true">
            <lucide-icon name="Plus" [size]="18"></lucide-icon> Add Product
          </button>
        </div>
      </div>

      <!-- Workable QR Scanner Interface -->
      <div *ngIf="showScanner" class="scanner-overlay" (click)="showScanner = false">
        <div class="scanner-modal glass-card premium-shadow" (click)="$event.stopPropagation()">
          <div class="scanner-header">
            <h3>Camera QR Scanner</h3>
            <button class="close-btn" (click)="showScanner = false"><lucide-icon name="X" [size]="20"></lucide-icon></button>
          </div>
          <div class="camera-frame">
            <div class="scan-area"></div>
            <div class="scan-line"></div>
            <p>Scanning for QR Code...</p>
          </div>
          <div class="scanner-results" *ngIf="scanResult">
            <div class="success-icon"><lucide-icon name="CheckCircle" [size]="40"></lucide-icon></div>
            <p>Product Found: <strong>{{scanResult.name}}</strong></p>
            <button class="btn-primary" (click)="addProductFromScan()">Add 1 to Inventory</button>
          </div>
          <div class="scanner-footer" *ngIf="!scanResult">
            <button class="btn-outline" (click)="simulateScan()">Simulate Scan</button>
          </div>
        </div>
      </div>

      <!-- Add Product Modal -->
      <div *ngIf="showAddModal" class="modal-overlay">
        <div class="modal-card premium-shadow">
          <div class="modal-header">
            <h3>Add New Product</h3>
            <button (click)="showAddModal = false"><lucide-icon name="X" [size]="20"></lucide-icon></button>
          </div>
          <div class="form-grid">
            <div class="field">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. iPhone 15 Pro">
            </div>
            <div class="field">
              <label>Brand</label>
              <input type="text" placeholder="e.g. Apple">
            </div>
            <div class="field">
              <label>Category</label>
              <select><option>Mobile</option><option>Laptop</option></select>
            </div>
            <div class="field">
              <label>Price (₹)</label>
              <input type="text" placeholder="e.g. 109900">
            </div>
            <div class="field">
              <label>Quantity</label>
              <input type="number" value="1">
            </div>
            <div class="field">
              <label>Supplier</label>
              <input type="text" placeholder="Supplier Name">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-primary" (click)="showAddModal = false">Add Product</button>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="filters-card premium-shadow">
        <div class="search-box">
          <lucide-icon name="Search" [size]="20"></lucide-icon>
          <input type="text" placeholder="Search by Product / SKU / Brand">
        </div>
        <div class="filter-row">
          <select><option>Category</option></select>
          <select><option>Brand</option></select>
          <select><option>Status</option></select>
          <button class="reset">Clear</button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="table-card premium-shadow">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td>#{{p.id}}</td>
              <td><strong>{{p.name}}</strong></td>
              <td>{{p.brand}}</td>
              <td>{{p.category}}</td>
              <td [class.low]="p.stock < 10">{{p.stock}}</td>
              <td><strong>₹{{p.price}}</strong></td>
              <td><span class="status-badge" [class]="p.status.toLowerCase().replace(' ', '-')">{{p.status}}</span></td>
              <td>
                <div class="actions">
                  <button class="icon-btn"><lucide-icon name="Pencil" [size]="16"></lucide-icon></button>
                  <button class="icon-btn delete"><lucide-icon name="Trash2" [size]="16"></lucide-icon></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .products-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
    .header-actions { display: flex; gap: 12px; }

    .scanner-overlay, .modal-overlay { 
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
      z-index: 2000; display: flex; align-items: center; justify-content: center;
    }
    .scanner-modal, .modal-card { width: 480px; border-radius: 28px; padding: 32px; background: #fff; }
    .scanner-header, .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .camera-frame { 
      background: #000; height: 280px; border-radius: 20px; position: relative; 
      display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;
    }
    .scan-area { width: 180px; height: 180px; border: 2px solid #fff; border-radius: 24px; z-index: 2; }
    .scan-line { position: absolute; width: 100%; height: 2px; background: var(--primary); top: 50%; left: 0; box-shadow: 0 0 10px var(--primary); animation: scan 2s infinite linear; }
    @keyframes scan { 0% { top: 20%; } 100% { top: 80%; } }
    .camera-frame p { color: #fff; margin-top: 12px; font-weight: 500; }

    .scanner-results { margin-top: 24px; text-align: center; }
    .success-icon { color: var(--success); margin-bottom: 12px; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    .field.full { grid-column: span 2; }
    .field input, .field select { padding: 12px; border-radius: 12px; border: 1px solid var(--border); outline: none; }
    .modal-footer { margin-top: 32px; display: flex; justify-content: flex-end; }

    .filters-card { background: #fff; padding: 24px; border-radius: 24px; display: flex; flex-direction: column; gap: 16px; }
    .search-box { background: #f8fafc; border-radius: 14px; display: flex; align-items: center; padding: 12px 20px; gap: 12px; border: 1px solid var(--border); }
    .search-box input { border: none; background: transparent; outline: none; flex: 1; }
    .filter-row { display: flex; gap: 12px; }
    .filter-row select { padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border); background: #fff; }

    .table-card { background: #fff; border-radius: 24px; padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px; font-size: 0.85rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 16px; border-bottom: 1px solid #f8fafc; }
    td.low { color: var(--danger); font-weight: 800; }

    .status-badge { padding: 5px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.in-stock { background: #ecfdf5; color: #047857; }
    .status-badge.low-stock { background: #fffbeb; color: #b45309; }

    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; }
    .btn-outline { background: #fff; border: 1px solid var(--border); padding: 10px 20px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 700; }
  `]
})
export class ProductsComponent {
  showScanner = false;
  showAddModal = false;
  scanResult: any = null;

  products = [
    { id: '1001', name: 'iPhone 15 Pro', brand: 'Apple', category: 'Mobile', stock: 45, price: '1,09,900', status: 'In Stock' },
    { id: '1002', name: 'Galaxy S24 Ultra', brand: 'Samsung', category: 'Mobile', stock: 8, price: '1,29,900', status: 'Low Stock' },
    { id: '1003', name: 'MacBook Air M3', brand: 'Apple', category: 'Laptop', stock: 12, price: '1,14,900', status: 'In Stock' }
  ];

  simulateScan() {
    this.scanResult = { name: 'iPhone 15 Pro', brand: 'Apple' };
  }

  addProductFromScan() {
    const p = this.products.find(x => x.name === this.scanResult.name);
    if (p) p.stock++;
    this.showScanner = false;
    this.scanResult = null;
  }
}
