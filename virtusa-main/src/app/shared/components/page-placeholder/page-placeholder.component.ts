import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-page-placeholder',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="placeholder-page">
      <div class="page-header">
        <div>
          <h1>{{ title }}</h1>
          <p>System module for {{ title }} management and operations.</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary">
            <lucide-icon name="Plus" [size]="18"></lucide-icon>
            Add New
          </button>
          <button class="btn-secondary">
            <lucide-icon name="Download" [size]="18"></lucide-icon>
            Export
          </button>
        </div>
      </div>

      <div class="content-grid">
        <div class="card main-table premium-shadow">
          <div class="card-header">
            <h3>{{ title }} Records</h3>
            <div class="search-box">
              <lucide-icon name="Search" [size]="16"></lucide-icon>
              <input type="text" [placeholder]="'Search ' + title + '...'">
            </div>
          </div>
          
          <div class="placeholder-content">
            <div class="ghost-element header"></div>
            <div *ngFor="let i of [1,2,3,4,5]" class="ghost-row">
              <div class="ghost-cell sm"></div>
              <div class="ghost-cell lg"></div>
              <div class="ghost-cell md"></div>
              <div class="ghost-cell status"></div>
            </div>
          </div>
          
          <div class="pagination">
            <span>Showing 1-10 of 120 results</span>
            <div class="pager">
              <button disabled><lucide-icon name="ChevronLeft" [size]="16"></lucide-icon></button>
              <button class="active">1</button>
              <button>2</button>
              <button>3</button>
              <button><lucide-icon name="ChevronRight" [size]="16"></lucide-icon></button>
            </div>
          </div>
        </div>

        <div class="side-panel">
          <div class="card stats-summary premium-shadow">
            <h3>Module Analytics</h3>
            <div class="mini-stat">
              <span class="label">Total Records</span>
              <span class="value">1,240</span>
            </div>
            <div class="mini-stat">
              <span class="label">Last Updated</span>
              <span class="value">2 mins ago</span>
            </div>
            <div class="mini-stat">
              <span class="label">Efficiency</span>
              <span class="value success">98.2%</span>
            </div>
          </div>

          <div class="card quick-actions premium-shadow">
            <h3>Quick Actions</h3>
            <button class="action-btn"><lucide-icon name="Settings" [size]="16"></lucide-icon> Configure Module</button>
            <button class="action-btn"><lucide-icon name="FileText" [size]="16"></lucide-icon> Generate Audit</button>
            <button class="action-btn danger"><lucide-icon name="Trash2" [size]="16"></lucide-icon> Purge Cache</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
    .header-actions { display: flex; gap: 12px; }
    .content-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 20px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .search-box { display: flex; align-items: center; gap: 8px; background: var(--bg-main); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border); }
    .search-box input { background: transparent; border: none; outline: none; font-size: 0.85rem; }
    
    .placeholder-content { display: flex; flex-direction: column; gap: 16px; min-height: 400px; }
    .ghost-element { height: 40px; background: #f1f5f9; border-radius: 8px; }
    .ghost-row { display: flex; gap: 16px; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
    .ghost-cell { height: 20px; background: #f1f5f9; border-radius: 4px; }
    .ghost-cell.sm { width: 40px; }
    .ghost-cell.md { width: 120px; }
    .ghost-cell.lg { flex: 1; }
    .ghost-cell.status { width: 80px; background: #e2e8f0; }

    .pagination { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; font-size: 0.85rem; color: var(--text-muted); }
    .pager { display: flex; gap: 8px; }
    .pager button { width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--border); background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .pager button.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .mini-stat { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .mini-stat .label { color: var(--text-muted); font-size: 0.85rem; }
    .mini-stat .value { font-weight: 700; font-size: 0.95rem; }
    .mini-stat .value.success { color: var(--success); }

    .side-panel { display: flex; flex-direction: column; gap: 24px; }
    .action-btn { width: 100%; display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 10px; border: 1px solid var(--border); background: #fff; cursor: pointer; margin-bottom: 8px; font-size: 0.9rem; transition: all 0.2s; }
    .action-btn:hover { background: var(--bg-main); }
    .action-btn.danger { color: var(--danger); font-weight: 600; }
    
    .btn-secondary { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border); background: #fff; cursor: pointer; font-weight: 600; }
    
    @media (max-width: 1024px) { .content-grid { grid-template-columns: 1fr; } }
  `]
})
export class PagePlaceholderComponent {
  @Input() title = 'Module';
}
