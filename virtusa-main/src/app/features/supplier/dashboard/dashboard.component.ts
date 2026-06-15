import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-su-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, LucideAngularModule],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1>Supplier Portal</h1>
          <p>Manage your orders, deliveries, and invoices.</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary">
            <lucide-icon name="FileUp" [size]="18"></lucide-icon>
            Upload Invoice
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card 
          label="Active Orders" 
          value="8" 
          icon="ShoppingCart" 
          trend="2 New" 
          [trendUp]="true"
          [progress]="60">
        </app-stat-card>
        <app-stat-card 
          label="Pending ETA" 
          value="3" 
          icon="Clock" 
          iconBg="rgba(245, 158, 11, 0.1)" 
          iconColor="#f59e0b"
          trend="Action required" 
          [trendUp]="false"
          [progress]="30">
        </app-stat-card>
        <app-stat-card 
          label="Paid Invoices" 
          value="$12,400" 
          icon="CheckCircle" 
          iconBg="rgba(16, 185, 129, 0.1)" 
          iconColor="#10b981"
          trend="Last 30 days" 
          [trendUp]="true"
          [progress]="100">
        </app-stat-card>
        <app-stat-card 
          label="Delivery Rating" 
          value="4.8/5" 
          icon="Star" 
          iconBg="rgba(168, 85, 247, 0.1)" 
          iconColor="#a855f7"
          trend="Excellent" 
          [trendUp]="true"
          [progress]="95">
        </app-stat-card>
      </div>

      <div class="supplier-grid">
        <div class="card active-orders premium-shadow">
          <div class="card-header">
            <h3>Recent Purchase Orders</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Units</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of orders">
                <td><strong>#{{order.id}}</strong></td>
                <td>{{order.units}}</td>
                <td>{{order.due}}</td>
                <td><span class="status-badge" [class]="order.status.toLowerCase()">{{order.status}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card recent-notifications glass-card">
          <div class="card-header">
            <h3>Notifications</h3>
          </div>
          <div class="notif-list">
            <div *ngFor="let n of notifs" class="notif-item">
              <div class="notif-bullet"></div>
              <div class="notif-content">
                <p>{{n.msg}}</p>
                <span>{{n.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .supplier-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 24px; }
    .card-header { margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; font-size: 0.8rem; color: var(--text-muted); }
    td { padding: 12px; font-size: 0.9rem; }
    .status-badge { padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .status-badge.pending { background: #fef3c7; color: #92400e; }
    .status-badge.confirmed { background: #dcfce7; color: #166534; }
    
    .notif-list { display: flex; flex-direction: column; gap: 16px; }
    .notif-item { display: flex; gap: 12px; }
    .notif-bullet { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); margin-top: 6px; }
    .notif-content p { margin: 0; font-size: 0.85rem; font-weight: 500; }
    .notif-content span { font-size: 0.75rem; color: var(--text-muted); }
    @media (max-width: 1024px) { .supplier-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  orders = [
    { id: 'PO-900', units: 1500, due: '2024-06-15', status: 'Pending' },
    { id: 'PO-895', units: 800, due: '2024-06-12', status: 'Confirmed' },
    { id: 'PO-890', units: 200, due: '2024-06-10', status: 'Confirmed' }
  ];

  notifs = [
    { msg: 'Payment received for #PO-880', time: '2 hours ago' },
    { msg: 'New Purchase Order #PO-900', time: '5 hours ago' },
    { msg: 'ETA Update requested for #PO-895', time: '1 day ago' }
  ];
}


