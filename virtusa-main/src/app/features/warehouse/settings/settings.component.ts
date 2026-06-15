import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouse-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1>Profile & Operational Settings</h1>
          <p>Manage your warehouse staff profile and notification preferences.</p>
        </div>
      </div>

      <div class="settings-grid">
        <div class="left-col">
          <!-- Profile Section -->
          <div class="card profile-card premium-shadow">
            <div class="card-header">
              <h3>Employee Profile</h3>
            </div>
            <div class="profile-header">
              <div class="avatar-large gradient-bg">JD</div>
              <div class="profile-title">
                 <h4>John Doe</h4>
                 <p>Warehouse Associate • ID #WS-89021</p>
              </div>
            </div>
            <div class="form">
              <div class="field">
                <label>Email Address</label>
                <input type="email" [(ngModel)]="profile.email">
              </div>
              <div class="field">
                <label>Phone Number</label>
                <input type="text" [(ngModel)]="profile.phone">
              </div>
              <div class="field">
                <label>Work Shift</label>
                <input type="text" value="Morning Shift (8AM - 4PM)" readonly>
              </div>
              <div class="form-actions">
                <button class="btn-primary" (click)="updateProfile()">Update Profile</button>
              </div>
            </div>
          </div>

          <!-- Security Section -->
          <div class="card security-card premium-shadow">
            <div class="card-header">
              <h3>Security & Password</h3>
            </div>
            <div class="form">
              <div class="field">
                <label>Current Password</label>
                <input type="password" [(ngModel)]="passwords.current">
              </div>
              <div class="field">
                <label>New Password</label>
                <input type="password" [(ngModel)]="passwords.new" placeholder="Min 8 characters">
              </div>
              <div class="form-actions">
                <button class="btn-outline" (click)="changePassword()">Change Password</button>
              </div>
            </div>
          </div>
        </div>

        <div class="right-col">
          <!-- Notifications Section -->
          <div class="card notif-card premium-shadow">
            <div class="card-header">
              <h3>Communication Preferences</h3>
            </div>
            <div class="toggle-list">
              <div class="toggle-item" *ngFor="let pref of notifications" (click)="pref.enabled = !pref.enabled">
                <div class="t-label">
                   <strong>{{pref.title}}</strong>
                   <p>{{pref.desc}}</p>
                </div>
                <div class="toggle-switch" [class.active]="pref.enabled"></div>
              </div>
            </div>
          </div>

          <!-- Appearance -->
          <div class="card app-card premium-shadow">
             <div class="card-header">
              <h3>System Appearance</h3>
            </div>
            <div class="mode-select">
              <div class="mode-btn" [class.active]="theme === 'light'" (click)="theme = 'light'">
                 <lucide-icon name="Sun" [size]="20"></lucide-icon> Light Mode
              </div>
              <div class="mode-btn" [class.active]="theme === 'dark'" (click)="theme = 'dark'">
                 <lucide-icon name="Moon" [size]="20"></lucide-icon> Dark Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { display: flex; flex-direction: column; gap: 32px; animation: fadeIn 0.4s ease-out; }
    .page-header h1 { font-size: 2rem; font-weight: 900; color: var(--secondary); margin: 0; }
    
    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .left-col, .right-col { display: flex; flex-direction: column; gap: 32px; }

    .card { background: #fff; border-radius: 28px; padding: 32px; border: 1px solid var(--border); }
    .card-header h3 { margin: 0; font-size: 1.25rem; font-weight: 850; color: var(--secondary); }

    .profile-header { display: flex; align-items: center; gap: 24px; margin-bottom: 32px; }
    .avatar-large { width: 80px; height: 80px; border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: 900; }
    .profile-title h4 { margin: 0; font-size: 1.5rem; font-weight: 900; }
    .profile-title p { margin: 4px 0 0 0; color: var(--text-muted); font-weight: 600; }

    .form { display: flex; flex-direction: column; gap: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    .field label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .field input { padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border); outline: none; transition: 0.2s; font-size: 0.95rem; }
    .field input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(0, 137, 123, 0.1); }
    .field input[readonly] { background: var(--bg-main); color: var(--text-muted); cursor: not-allowed; }

    .form-actions { display: flex; justify-content: flex-end; margin-top: 12px; }
    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }
    .btn-outline { background: #fff; border: 1px solid var(--border); padding: 10px 20px; border-radius: 14px; font-weight: 700; cursor: pointer; }

    .toggle-list { display: flex; flex-direction: column; gap: 24px; }
    .toggle-item { display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
    .t-label strong { font-size: 1rem; color: var(--text-main); }
    .t-label p { margin: 4px 0 0 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }

    .toggle-switch { width: 44px; height: 24px; background: #e2e8f0; border-radius: 12px; position: relative; transition: 0.3s; }
    .toggle-switch::after { content: ''; position: absolute; width:18px; height: 18px; background: #fff; border-radius: 50%; top: 3px; left: 3px; transition: 0.3s; }
    .toggle-switch.active { background: var(--primary); }
    .toggle-switch.active::after { left: 23px; }

    .mode-select { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px; }
    .mode-btn { background: #f8fafc; padding: 16px; border-radius: 20px; border: 2px solid transparent; text-align: center; font-weight: 800; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; }
    .mode-btn.active { background: #fff; border-color: var(--primary); color: var(--primary); box-shadow: 0 4px 12px rgba(0, 137, 123, 0.1); }
    
    @media (max-width: 1200px) { .settings-grid { grid-template-columns: 1fr; } }
  `]
})
export class WarehouseSettingsComponent implements OnInit {
  profile = { email: 'john.doe@supplysync.com', phone: '+91 98765 43210' };
  passwords = { current: '', new: '' };
  theme = 'light';

  notifications = [
    { title: 'Low Stock Alerts', desc: 'Notify when SKU items go below reorder level.', enabled: true },
    { title: 'Dispatch Updates', desc: 'Get alerted when shipments are packed or delayed.', enabled: true },
    { title: 'Return Notifications', desc: 'Alert when new return requests are initiated.', enabled: false },
    { title: 'System Maintenance', desc: 'Updates about warehouse software downtime.', enabled: true }
  ];

  ngOnInit() {}

  updateProfile() {
    alert('Profile updated successfully! \nEmail: ' + this.profile.email);
  }

  changePassword() {
    if (this.passwords.new.length < 8) {
      alert('Error: New password must be at least 8 characters long.');
      return;
    }
    alert('Password changed successfully! Please log in again next time.');
    this.passwords = { current: '', new: '' };
  }
}
