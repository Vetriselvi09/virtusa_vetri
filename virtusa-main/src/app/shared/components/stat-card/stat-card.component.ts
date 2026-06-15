import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="stat-card premium-shadow">
      <div class="stat-header">
        <div class="icon-box" [style.background-color]="iconBg">
          <lucide-icon [name]="icon" [size]="20" [style.color]="iconColor"></lucide-icon>
        </div>
        <span class="trend" [class.up]="trendUp" [class.down]="!trendUp">
          {{ trend }}
        </span>
      </div>
      <div class="stat-body">
        <h3 class="value">{{ value }}</h3>
        <p class="label">{{ label }}</p>
      </div>
      <div class="stat-footer">
        <div class="progress-bar">
          <div class="progress-fill" [style.width]="progress + '%'" [style.background-color]="iconColor"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: #fff;
      padding: 20px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: transform 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-4px);
    }
    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .trend {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 20px;
    }
    .trend.up {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }
    .trend.down {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger);
    }
    .stat-body .value {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: var(--text-main);
    }
    .stat-body .label {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 4px 0 0 0;
    }
    .progress-bar {
      height: 4px;
      background: var(--bg-main);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 2px;
    }
  `]
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() icon = 'Activity';
  @Input() iconBg = 'rgba(99, 102, 241, 0.1)';
  @Input() iconColor = '#6366f1';
  @Input() trend = '+0%';
  @Input() trendUp = true;
  @Input() progress = 70;
}

