import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../services/warehouse.service';
import { StockReceipt } from '../models/warehouse.models';

@Component({
  selector: 'app-stock-receipt',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  template: `
    <div class="receipt-page">
      <div class="page-header">
        <div>
          <h1>Stock Receipt Entry</h1>
          <p>Register incoming product shipments and verify conditions.</p>
        </div>
        <div class="header-actions">
           <button class="btn-outline" (click)="showScanner = true">
            <lucide-icon name="ScanLine" [size]="18"></lucide-icon> Scan QR
          </button>
        </div>
      </div>

      <!-- QR Scanner Overlay -->
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
          <div class="scanner-footer">
            <button class="btn-outline" (click)="simulateScan()">Simulate Scan</button>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <!-- Entry Form -->
        <div class="card form-card premium-shadow">
          <div class="card-header">
            <h3>Receive Product</h3>
          </div>
          <form [formGroup]="receiptForm" (ngSubmit)="onSubmit()">
            <div class="fields-row">
              <div class="field">
                <label>Product Name</label>
                <input type="text" formControlName="productName" placeholder="e.g. iPhone 15 Pro">
              </div>
              <div class="field">
                <label>SKU / Product ID</label>
                <input type="text" formControlName="productId" placeholder="e.g. SKU-123">
              </div>
            </div>
            <div class="fields-row">
              <div class="field">
                <label>Supplier Name</label>
                <input type="text" formControlName="supplier" placeholder="Select Supplier">
              </div>
              <div class="field">
                <label>Quantity Received</label>
                <input type="number" formControlName="quantity">
              </div>
            </div>
            <div class="fields-row">
              <div class="field">
                <label>Batch Number</label>
                <input type="text" formControlName="batch" placeholder="B-2024-X">
              </div>
              <div class="field">
                <label>Received Date</label>
                <input type="date" formControlName="date">
              </div>
            </div>
            <div class="field">
              <label>Condition Status</label>
              <select formControlName="status">
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Pending Inspection">Pending Inspection</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-outline">Cancel</button>
              <button type="submit" class="btn-primary" [disabled]="!receiptForm.valid">Receive Product</button>
            </div>
          </form>
        </div>

        <!-- History Summary -->
        <div class="card table-card premium-shadow">
           <div class="card-header">
            <h3>Recently Received Products</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Supplier</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of receipts">
                <td>{{r.productId}}</td>
                <td><strong>{{r.productName}}</strong></td>
                <td>{{r.supplier}}</td>
                <td>{{r.quantity}}</td>
                <td>
                  <span class="status-badge" [class]="r.status.toLowerCase()">{{r.status}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .receipt-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .card-header h3 { margin: 0; font-size: 1.25rem; font-weight: 850; color: var(--secondary); }

    .fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .field label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .field input, .field select { padding: 12px 16px; border-radius: 14px; border: 1px solid var(--border); outline: none; transition: 0.3s; font-size: 0.95rem; }
    .field input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(0, 137, 123, 0.1); }

    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }
    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-outline { background: #fff; border: 1px solid var(--border); padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 14px; color: var(--text-muted); font-size: 0.85rem; border-bottom: 1px solid var(--border); }
    td { padding: 14px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; }

    .status-badge { padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.good { background: #ecfdf5; color: #047857; }
    .status-badge.damaged { background: #fef2f2; color: #b91c1c; }
    .status-badge.pending { background: #fffbeb; color: #b45309; }

    .scanner-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; }
    .scanner-modal { width: 440px; background: #fff; border-radius: 28px; padding: 32px; }
    .camera-frame { height: 280px; background: #000; border-radius: 20px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 24px; }
    .scan-area { width: 180px; height: 180px; border: 2px solid #fff; border-radius: 24px; z-index: 2; }
    .scan-line { position: absolute; width: 100%; height: 2px; background: var(--primary); top: 50%; animation: scan 2s infinite linear; }
    @keyframes scan { 0% { top: 20%; } 100% { top: 80%; } }

    @media (max-width: 1200px) { .form-grid { grid-template-columns: 1fr; } }
  `]
})
export class StockReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  showScanner = false;
  receipts: StockReceipt[] = [];

  constructor(private fb: FormBuilder, private warehouseService: WarehouseService) {
    this.receiptForm = this.fb.group({
      productName: ['', Validators.required],
      productId: ['', Validators.required],
      supplier: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      batch: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      status: ['Good']
    });
  }

  ngOnInit() {
    this.warehouseService.getReceipts().subscribe(r => this.receipts = r);
  }

  simulateScan() {
    this.receiptForm.patchValue({
      productName: 'iPhone 15 Pro',
      productId: 'SKU-7721',
      supplier: 'Apple Global'
    });
    this.showScanner = false;
  }

  onSubmit() {
    if (this.receiptForm.valid) {
      this.receipts.unshift(this.receiptForm.value);
      this.receiptForm.reset({
        date: new Date().toISOString().substring(0, 10),
        status: 'Good',
        quantity: 1
      });
    }
  }
}
