import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sa-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, LucideAngularModule],
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1>Control Center</h1>
          <p>Global system management and auditing.</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary">
            <lucide-icon name="Settings" [size]="18"></lucide-icon>
            System Settings
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card 
          label="Total Users" 
          value="1,256" 
          icon="Users" 
          trend="+54" 
          [trendUp]="true"
          [progress]="80">
        </app-stat-card>
        <app-stat-card 
          label="Active Stores" 
          value="48" 
          icon="Store" 
          iconBg="rgba(16, 185, 129, 0.1)" 
          iconColor="#10b981"
          trend="All Online" 
          [trendUp]="true"
          [progress]="100">
        </app-stat-card>
        <app-stat-card 
          label="Global API Calls" 
          value="2.4M" 
          icon="Activity" 
          iconBg="rgba(59, 130, 246, 0.1)" 
          iconColor="#3b82f6"
          trend="+12%" 
          [trendUp]="true"
          [progress]="60">
        </app-stat-card>
        <app-stat-card 
          label="Security Events" 
          value="0" 
          icon="ShieldCheck" 
          iconBg="rgba(168, 85, 247, 0.1)" 
          iconColor="#a855f7"
          trend="Secure" 
          [trendUp]="true"
          [progress]="0">
        </app-stat-card>
      </div>

      <div class="admin-grid">
        <div class="card system-health glass-card">
          <div class="card-header">
            <h3>System Performance</h3>
          </div>
          <div class="health-metrics">
            <div class="metric">
              <span>Server Latency</span>
              <div class="status-indicator online">45ms</div>
            </div>
            <div class="metric">
              <span>DB Connectivity</span>
              <div class="status-indicator online">Healthy</div>
            </div>
            <div class="metric">
              <span>CDN Status</span>
              <div class="status-indicator online">Active</div>
            </div>
            <div class="metric">
              <span>Storage Usage</span>
              <div class="status-indicator warning">82%</div>
            </div>
          </div>
        </div>

        <div class="card security-logs premium-shadow">
          <div class="card-header">
            <h3>Security & Audit Logs</h3>
            <a href="#">Export CSV</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>IP</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let log of logs">
                <td><strong>{{log.user}}</strong></td>
                <td>{{log.action}}</td>
                <td><code>{{log.ip}}</code></td>
                <td>{{log.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .admin-grid { display: grid; grid-template-columns: 350px 1fr; gap: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 24px; }
    .card-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
    .health-metrics { display: flex; flex-direction: column; gap: 16px; }
    .metric { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-main); border-radius: 10px; font-weight: 600; font-size: 0.9rem; }
    .status-indicator { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; }
    .status-indicator.online { background: #dcfce7; color: #166534; }
    .status-indicator.warning { background: #fef3c7; color: #92400e; }
    
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; font-size: 0.8rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 12px; font-size: 0.85rem; border-bottom: 1px solid #f8fafc; }
    code { background: #f1f5f9; padding: 2px 4px; border-radius: 4px; font-family: monospace; font-size: 0.75rem; }
    @media (max-width: 1024px) { .admin-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  logs = [
    { user: 'sys.admin', action: 'Login Success', ip: '192.168.1.1', time: 'Just now' },
    { user: 'manager.01', action: 'Role Update', ip: '10.0.4.22', time: '12 mins ago' },
    { user: 'fin.admin', action: 'PO Export', ip: '45.1.2.99', time: '1 hour ago' }
  ];
}


