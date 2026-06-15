import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sm-reports',
  standalone: true,
  imports: [CommonModule, StatCardComponent, LucideAngularModule],
  template: `
    <div class="reports-page">
      <div class="page-header">
        <div>
          <h1>SupplySync Analytics</h1>
          <p>Generate detailed operational reports and PDF summaries.</p>
        </div>
        <div class="header-actions">
           <div class="filter-group card premium-shadow">
            <button *ngFor="let f of filters" 
                    [class.active]="activeFilter === f"
                    (click)="activeFilter = f">{{f}}</button>
          </div>
          <button class="btn-primary" (click)="generatePDF()">
            <lucide-icon name="FileText" [size]="18"></lucide-icon> Generate PDF Report
          </button>
        </div>
      </div>

      <div class="reports-grid">
        <div class="stats-grid">
          <app-stat-card 
            label="Total Sales" 
            value="₹12,45,200" 
            icon="TrendingUp" 
            iconBg="rgba(16, 185, 129, 0.1)" 
            iconColor="#10b981"
            [trend]="'+14% vs Last ' + activeFilter" 
            [trendUp]="true"
            [progress]="82">
          </app-stat-card>
          <app-stat-card 
            label="Inventory Cost" 
            value="₹4,82,000" 
            icon="Package" 
            iconBg="rgba(59, 130, 246, 0.1)" 
            iconColor="#3b82f6"
            trend="-5% Optimizing" 
            [trendUp]="false"
            [progress]="45">
          </app-stat-card>
          <app-stat-card 
            label="Pending PO Value" 
            value="₹7,15,400" 
            icon="ShoppingCart" 
            iconBg="rgba(245, 158, 11, 0.1)" 
            iconColor="#f59e0b"
            trend="Needs Approval" 
            [trendUp]="true"
            [progress]="65">
          </app-stat-card>
        </div>

        <div class="viz-row">
          <div class="card viz-card premium-shadow">
            <div class="card-header">
              <h3>Inventory Trends ({{activeFilter}})</h3>
            </div>
            <div class="viz-placeholder">
              <div class="chart-mock">
                <!-- Bar chart mockup -->
                <div *ngFor="let v of [40, 65, 32, 78, 55, 90, 42]" class="bar" [style.height.%]="v"></div>
              </div>
              <div class="labels">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          <div class="card analytics-list premium-shadow">
            <div class="card-header">
              <h3>Low Stock Analysis</h3>
            </div>
            <div class="analysis-items">
              <div *ngFor="let item of analysisItems" class="a-item">
                <div class="a-info">
                  <p>{{item.name}}</p>
                  <small>{{item.reason}}</small>
                </div>
                <div class="a-meta">
                   <span class="impact" [class]="item.severity">{{item.impact}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-page { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.4s ease-out; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
    .page-header h1 { font-size: 1.75rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .header-actions { display: flex; gap: 16px; align-items: center; }
    .filter-group { background: #fff; padding: 6px; border-radius: 12px; display: flex; gap: 4px; border: 1px solid var(--border); }
    .filter-group button { 
      padding: 8px 16px; border: none; border-radius: 8px; font-weight: 700; 
      font-size: 0.8rem; cursor: pointer; transition: 0.2s; background: transparent; color: var(--text-muted);
    }
    .filter-group button.active { background: var(--bg-main); color: var(--primary); }

    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .reports-grid { display: flex; flex-direction: column; gap: 24px; }

    .viz-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
    .card { background: #fff; border-radius: 24px; padding: 24px; }
    .card-header h3 { margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--secondary); }

    .viz-placeholder { height: 300px; display: flex; flex-direction: column; gap: 16px; padding-top: 20px; }
    .chart-mock { flex: 1; display: flex; align-items: flex-end; gap: 12px; }
    .bar { flex: 1; background: var(--primary); border-radius: 6px 6px 0 0; opacity: 0.8; transition: 0.3s; }
    .bar:hover { opacity: 1; transform: scaleY(1.05); }
    .labels { display: flex; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 8px; }
    .labels span { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }

    .analysis-items { display: flex; flex-direction: column; gap: 14px; }
    .a-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f8fafc; border-radius: 16px; }
    .a-info p { margin: 0; font-weight: 700; font-size: 0.9rem; }
    .a-info small { color: var(--text-muted); font-size: 0.8rem; }
    .impact { font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; }
    .impact.high { background: #fef2f2; color: #b91c1c; }
    .impact.med { background: #fffbeb; color: #b45309; }

    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 137, 123, 0.3); }

    @media (max-width: 1100px) { .viz-row { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: 1fr; } }
  `]
})
export class ReportsComponent {
  filters = ['Daily', 'Weekly', 'Monthly'];
  activeFilter = 'Weekly';

  analysisItems = [
    { name: 'iPhone 15 Pro', reason: 'High demand, 5 units/day', impact: 'High Impact', severity: 'high' },
    { name: 'Galaxy S24', reason: 'Supplier delay predicted', impact: 'Medium Risk', severity: 'med' },
    { name: 'MacBook Air', reason: 'Campaign starting soon', impact: 'Medium Risk', severity: 'med' }
  ];

  generatePDF() {
    alert('Generating SupplySync Operational Report (PDF)... \nLive Data Source: retail_db \nStatus: SUCCESS');
  }
}
