import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sm-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, LucideAngularModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1>SupplySync Dashboard</h1>
          <p>Real-time analytics for your retail supply chain operations.</p>
        </div>
        <div class="quick-actions-bar">
          <button class="action-btn" routerLink="../products">
            <lucide-icon name="Plus" [size]="18"></lucide-icon> New Product
          </button>
          <button class="action-btn" routerLink="../orders">
            <lucide-icon name="ShoppingCart" [size]="18"></lucide-icon> Create PO
          </button>
        </div>
      </div>

      <!-- Top Stat Cards (Dynamic Simulation) -->
      <div class="stats-grid">
        <app-stat-card 
          label="Total Products" 
          [value]="stats.totalProducts" 
          icon="Package" 
          iconBg="rgba(0, 137, 123, 0.1)" 
          iconColor="#00897b">
        </app-stat-card>
        <app-stat-card 
          label="Inventory Stock" 
          [value]="stats.totalStock" 
          icon="Activity" 
          iconBg="rgba(59, 130, 246, 0.1)" 
          iconColor="#3b82f6">
        </app-stat-card>
        <app-stat-card 
          label="Low Stock Alert" 
          [value]="stats.lowStock" 
          icon="AlertTriangle" 
          iconBg="rgba(239, 68, 68, 0.1)" 
          iconColor="#ef4444">
        </app-stat-card>
        <app-stat-card 
          label="Total Sales (₹)" 
          [value]="'₹' + stats.totalSales" 
          icon="TrendingUp" 
          iconBg="rgba(16, 185, 129, 0.1)" 
          iconColor="#10b981">
        </app-stat-card>
      </div>

      <div class="dashboard-layout">
        <div class="left-col">
          <!-- Sales Overview Viz -->
          <div class="card viz-card premium-shadow">
            <div class="card-header">
              <h3>Sales Overview</h3>
              <div class="filter-pills">
                <button [class.active]="viewRange === 10" (click)="viewRange = 10">10 Days</button>
                <button [class.active]="viewRange === 30" (click)="viewRange = 30">30 Days</button>
              </div>
            </div>
            <div class="viz-content">
              <div class="custom-chart">
                <div *ngFor="let bar of getVizData()" 
                     class="bar-wrap" 
                     [style.height.%]="bar.val">
                  <div class="bar" [title]="bar.label + ': ' + bar.val"></div>
                  <span>{{bar.label}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card activity-card premium-shadow">
             <div class="card-header">
              <h3>Recent Activities</h3>
            </div>
            <div class="activity-feed">
              <div *ngFor="let act of activities" class="activity-item">
                <div class="act-dot" [class]="act.type"></div>
                <div class="act-body">
                  <p><strong>{{act.user}}</strong> {{act.action}} <span>{{act.item}}</span></p>
                  <small>{{act.time}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-col">
           <!-- Dynamic Notifications -->
           <div class="card info-card premium-shadow">
            <div class="card-header">
              <h3>System Notifications</h3>
              <span class="badge" [class.danger]="unreadCount > 0">{{unreadCount}} New</span>
            </div>
            <div class="notif-box">
              <div *ngFor="let n of notifications" class="n-item" [class.unread]="!n.read">
                <lucide-icon [name]="n.icon" [style.color]="n.color" [size]="18"></lucide-icon>
                <div class="n-text">
                  <p>{{n.msg}}</p>
                  <small>{{n.time}}</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Products -->
          <div class="card info-card premium-shadow">
            <div class="card-header">
              <h3>Top Selling ({{viewRange}} Days)</h3>
            </div>
            <div class="top-list">
              <div *ngFor="let p of topProducts" class="top-item">
                <div class="p-img gradient-bg">{{p.initials}}</div>
                <div class="p-details">
                  <p>{{p.name}}</p>
                  <small>{{p.brand}}</small>
                </div>
                <span class="p-sales">₹{{p.revenue}}</span>
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
    .page-header p { color: var(--text-muted); margin: 8px 0 0 0; font-size: 1rem; }

    .quick-actions-bar { display: flex; gap: 16px; }
    .action-btn { 
      padding: 12px 24px; border-radius: 16px; border: 1px solid var(--border); 
      background: #fff; display: flex; align-items: center; gap: 12px; 
      font-weight: 700; color: var(--text-main); cursor: pointer; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .action-btn:hover { background: var(--bg-main); color: var(--primary); transform: translateY(-3px); border-color: var(--primary); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }

    .dashboard-layout { display: grid; grid-template-columns: 1.6fr 1.1fr; gap: 32px; }
    .left-col, .right-col { display: flex; flex-direction: column; gap: 32px; }

    .card { background: #fff; border-radius: 28px; padding: 32px; height: 100%; border: 1px solid var(--border); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
    .card-header h3 { margin: 0; font-size: 1.25rem; font-weight: 850; color: var(--secondary); letter-spacing: -0.02em; }

    .filter-pills { display: flex; background: var(--bg-main); padding: 6px; border-radius: 14px; }
    .filter-pills button { 
      border: none; padding: 8px 18px; border-radius: 10px; font-size: 0.85rem; 
      font-weight: 800; cursor: pointer; transition: 0.2s; background: transparent; color: var(--text-muted);
    }
    .filter-pills button.active { background: #fff; color: var(--primary); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

    .viz-content { height: 280px; display: flex; align-items: flex-end; padding-top: 24px; }
    .custom-chart { display: flex; width: 100%; height: 100%; align-items: flex-end; gap: 12px; }
    .bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer; }
    .bar { width: 100%; background: var(--primary); border-radius: 8px 8px 0 0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0.85; position: relative; }
    .bar:hover { opacity: 1; transform: scaleX(1.05); filter: brightness(1.1); }
    .bar-wrap span { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }

    .activity-feed { display: flex; flex-direction: column; gap: 20px; }
    .activity-item { display: flex; gap: 20px; align-items: center; padding: 16px; border-radius: 20px; background: #f8fafc; transition: 0.2s; }
    .activity-item:hover { background: #f1f5f9; }
    .act-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 4px rgba(0,0,0,0.03); }
    .act-dot.add { background: var(--success); }
    .act-dot.update { background: var(--primary); }
    .act-dot.po { background: var(--warning); }
    .act-body p { margin: 0; font-size: 1rem; color: var(--text-main); line-height: 1.5; }
    .act-body p span { color: var(--primary); font-weight: 800; }
    .act-body small { color: var(--text-muted); font-weight: 600; font-size: 0.8rem; }

    .badge { padding: 6px 14px; border-radius: 12px; font-size: 0.8rem; font-weight: 850; background: var(--bg-main); color: var(--text-muted); text-transform: uppercase; }
    .badge.danger { background: var(--danger); color: #fff; }

    .notif-box { display: flex; flex-direction: column; gap: 18px; }
    .n-item { display: flex; gap: 18px; padding: 18px; border-radius: 20px; background: #f8fafc; transition: 0.3s; border: 1px solid transparent; }
    .n-item:hover { transform: translateX(8px); background: #fff; border-color: var(--border); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
    .n-text p { margin: 0; font-size: 0.95rem; font-weight: 750; color: var(--text-main); }
    .n-text small { color: var(--text-muted); font-weight: 600; }

    .top-list { display: flex; flex-direction: column; gap: 18px; }
    .top-item { display: flex; align-items: center; gap: 18px; padding: 12px; border-radius: 20px; transition: 0.2s; }
    .top-item:hover { background: #f8fafc; }
    .p-img { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .p-details { flex: 1; }
    .p-details p { margin: 0; font-size: 1rem; font-weight: 800; color: var(--text-main); }
    .p-details small { color: var(--text-muted); font-weight: 600; }
    .p-sales { font-weight: 900; color: var(--success); font-size: 1.1rem; }

    @media (max-width: 1400px) { .dashboard-layout { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { 
      .page-header { flex-direction: column; align-items: flex-start; gap: 20px; }
      .quick-actions-bar { width: 100%; flex-direction: column; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  viewRange = 10;
  unreadCount = 2;
  
  stats = {
    totalProducts: '1,452',
    totalStock: '12,840',
    lowStock: '24',
    totalSales: '8,42,500'
  };

  notifications = [
    { msg: 'Product stock running low (iPhone 15)', time: '5m ago', icon: 'ShieldAlert', color: '#ef4444', read: false },
    { msg: 'New purchase order received', time: '12m ago', icon: 'ShoppingCart', color: '#00897b', read: false },
    { msg: 'Supplier shipment delayed', time: '1h ago', icon: 'Clock', color: '#f59e0b', read: true }
  ];

  activities = [
    { user: 'John Smith', action: 'added product', item: 'Samsung S24', time: '10 mins ago', type: 'add' },
    { user: 'Manager', action: 'updated inventory', item: 'Warehouse B', time: '45 mins ago', type: 'update' },
    { user: 'Finance', action: 'approved PO', item: '#9401', time: '2 hours ago', type: 'po' }
  ];

  topProducts = [
    { name: 'iPhone 15 Pro', brand: 'Apple', revenue: '4,50,000', initials: 'IP' },
    { name: 'S24 Ultra', brand: 'Samsung', revenue: '2,90,000', initials: 'S24' },
    { name: 'Pixel 8 Pro', brand: 'Google', revenue: '1,02,500', initials: 'P8' }
  ];

  ngOnInit() {}

  getVizData() {
    // Dynamic data simulation based on viewRange
    if (this.viewRange === 10) {
      return [
        { label: 'Jun 01', val: 65 }, { label: 'Jun 02', val: 45 }, { label: 'Jun 03', val: 78 },
        { label: 'Jun 04', val: 32 }, { label: 'Jun 05', val: 90 }, { label: 'Jun 06', val: 56 },
        { label: 'Jun 07', val: 85 }, { label: 'Jun 08', val: 42 }, { label: 'Jun 09', val: 68 },
        { label: 'Jun 10', val: 95 }
      ];
    } else {
      return Array.from({length: 15}, (_, i) => ({ 
        label: 'W' + (i+1), 
        val: Math.floor(Math.random() * 60) + 40 
      }));
    }
  }
}
