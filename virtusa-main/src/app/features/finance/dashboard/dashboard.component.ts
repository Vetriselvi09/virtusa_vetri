import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-fi-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, LucideAngularModule],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1>Financial Insights</h1>
          <p>Global revenue, valuation, and expense tracking.</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary">
            <lucide-icon name="FileText" [size]="18"></lucide-icon>
            Quarterly Report
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card 
          label="Total Revenue" 
          value="$1.2M" 
          icon="TrendingUp" 
          trend="+15%" 
          [trendUp]="true"
          [progress]="90">
        </app-stat-card>
        <app-stat-card 
          label="Net Profit" 
          value="$240K" 
          icon="Wallet" 
          iconBg="rgba(16, 185, 129, 0.1)" 
          iconColor="#10b981"
          trend="+5%" 
          [trendUp]="true"
          [progress]="45">
        </app-stat-card>
        <app-stat-card 
          label="Pending POs" 
          value="$84K" 
          icon="Clock" 
          iconBg="rgba(245, 158, 11, 0.1)" 
          iconColor="#f59e0b"
          trend="12 Required" 
          [trendUp]="false"
          [progress]="65">
        </app-stat-card>
        <app-stat-card 
          label="Valuation" 
          value="$4.5M" 
          icon="Landmark" 
          iconBg="rgba(168, 85, 247, 0.1)" 
          iconColor="#a855f7"
          trend="+12%" 
          [trendUp]="true"
          [progress]="100">
        </app-stat-card>
      </div>

      <div class="finance-grid">
        <div class="card glass-card">
          <div class="card-header">
            <h3>Expense Breakdown</h3>
          </div>
          <div class="expense-list">
            <div *ngFor="let ex of expenses" class="expense-item">
              <div class="ex-info">
                <span class="category">{{ex.category}}</span>
                <span class="sub">{{ex.sub}}</span>
              </div>
              <div class="ex-value">
                <span class="amount">{{ex.amount}}</span>
                <div class="mini-bar"><div [style.width]="ex.perc + '%'" class="fill"></div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card approvals-card premium-shadow">
          <div class="card-header">
            <h3>Pending Approvals</h3>
            <a href="#">Manage</a>
          </div>
          <div class="approval-list">
            <div *ngFor="let po of pending" class="po-item">
              <div class="po-id">#{{po.id}}</div>
              <div class="po-details">
                <span class="sup">{{po.supplier}}</span>
                <span class="val">{{po.value}}</span>
              </div>
              <button class="approve-btn">Approve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header h1 { margin: 0; font-size: 1.75rem; font-weight: 700; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .finance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 24px; }
    .card-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
    .expense-list { display: flex; flex-direction: column; gap: 20px; }
    .expense-item { display: flex; justify-content: space-between; align-items: center; }
    .ex-info { display: flex; flex-direction: column; }
    .ex-info .category { font-weight: 600; font-size: 0.95rem; }
    .ex-info .sub { font-size: 0.75rem; color: var(--text-muted); }
    .ex-value { width: 120px; text-align: right; }
    .ex-value .amount { font-weight: 700; font-size: 0.95rem; display: block; margin-bottom: 4px; }
    .mini-bar { height: 4px; background: var(--bg-main); border-radius: 2px; }
    .mini-bar .fill { height: 100%; background: var(--primary); border-radius: 2px; }
    
    .approval-list { display: flex; flex-direction: column; gap: 12px; }
    .po-item { display: flex; align-items: center; gap: 16px; padding: 12px; border: 1px solid var(--border); border-radius: 12px; transition: border-color 0.2s; }
    .po-item:hover { border-color: var(--primary); }
    .po-id { font-weight: 800; color: var(--primary); font-size: 0.85rem; background: rgba(99, 102, 241, 0.1); padding: 8px; border-radius: 8px; }
    .po-details { flex: 1; display: flex; flex-direction: column; }
    .po-details .sup { font-weight: 600; font-size: 0.9rem; }
    .po-details .val { font-size: 0.8rem; color: var(--text-muted); }
    .approve-btn { padding: 6px 12px; border-radius: 6px; border: none; background: var(--success); color: #fff; font-weight: 600; font-size: 0.75rem; cursor: pointer; }
    @media (max-width: 1024px) { .finance-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  expenses = [
    { category: 'Inventory', sub: 'Stock Purchase', amount: '$45,000', perc: 65 },
    { category: 'Logistics', sub: 'Shipping & Port', amount: '$12,200', perc: 20 },
    { category: 'Operations', sub: 'Salaries & Admin', amount: '$28,000', perc: 40 }
  ];

  pending = [
    { id: 'PO-882', supplier: 'Tech Supply Co', value: '$12,400' },
    { id: 'PO-885', supplier: 'Office Depot', value: '$2,100' },
    { id: 'PO-889', supplier: 'Warehouse Inc', value: '$45,000' }
  ];
}


