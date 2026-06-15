import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sm-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1>SupplySync Settings</h1>
          <p>Manage your enterprise profile, security, and system preferences.</p>
        </div>
      </div>

      <div class="settings-grid">
        <aside class="settings-nav card premium-shadow">
          <button *ngFor="let s of sections" 
                  [class.active]="activeSection === s.id"
                  (click)="activeSection = s.id"
                  class="nav-btn">
            <lucide-icon [name]="s.icon" [size]="18"></lucide-icon>
            {{s.label}}
          </button>
        </aside>

        <main class="settings-content card premium-shadow">
          <div [ngSwitch]="activeSection">
            <!-- Profile Settings -->
            <div *ngSwitchCase="'profile'" class="section">
              <h3>Profile Settings</h3>
              <div class="form-grid">
                <div class="form-field">
                  <label>Full Name</label>
                  <input type="text" [(ngModel)]="profile.name">
                </div>
                <div class="form-field">
                  <label>Email Address</label>
                  <input type="email" [(ngModel)]="profile.email">
                </div>
                <div class="form-field">
                  <label>Phone Number</label>
                  <input type="text" [(ngModel)]="profile.phone">
                </div>
                <div class="form-field full">
                  <label>Update Password</label>
                  <input type="password" placeholder="Enter new password">
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div *ngSwitchCase="'notifications'" class="section">
              <h3>Notification Preferences</h3>
              <div class="options-list">
                <div class="option-item">
                  <div class="text">
                    <h5>Stock Alerts</h5>
                    <p>Notify when products reach reorder levels.</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="option-item">
                  <div class="text">
                    <h5>Purchase Alerts</h5>
                    <p>Notify on new PO received or approved.</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="option-item">
                  <div class="text">
                    <h5>Supplier Updates</h5>
                    <p>Alerts on shipment delays or delivery confirmations.</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="option-item">
                  <div class="text">
                    <h5>System Alerts</h5>
                    <p>Critical security or maintenance updates.</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Theme Settings -->
            <div *ngSwitchCase="'theme'" class="section">
              <h3>Appearance</h3>
              <div class="theme-grid">
                <div class="theme-card" [class.active]="theme === 'light'" (click)="theme = 'light'">
                  <div class="preview light"></div>
                  <span>Light Mode</span>
                </div>
                <div class="theme-card" [class.active]="theme === 'dark'" (click)="theme = 'dark'">
                  <div class="preview dark"></div>
                  <span>Dark Mode</span>
                </div>
              </div>
            </div>

            <!-- Company Settings -->
            <div *ngSwitchCase="'company'" class="section">
              <h3>Company Settings</h3>
              <div class="form-grid">
                <div class="form-field full">
                  <label>Company Name</label>
                  <input type="text" value="SupplySync">
                </div>
                <div class="form-field full">
                  <label>Company Logo</label>
                  <div class="logo-upload">
                    <div class="logo-preview">
                      <div class="p-logo gradient-bg">S</div>
                    </div>
                    <div class="upload-area">
                      <lucide-icon name="Upload" [size]="24"></lucide-icon>
                      <p>Click or drag to upload new logo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-actions">
            <button class="btn-primary">Save Changes</button>
            <button class="btn-outline">Discard</button>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.4s ease-out; }
    .page-header h1 { margin: 0; font-size: 2rem; font-weight: 800; color: var(--secondary); }

    .settings-grid { display: grid; grid-template-columns: 260px 1fr; gap: 24px; }
    .card { background: #fff; border-radius: 24px; padding: 24px; }
    
    .settings-nav { display: flex; flex-direction: column; gap: 8px; height: fit-content; }
    .nav-btn { 
      padding: 14px 16px; border: none; background: transparent; 
      display: flex; align-items: center; gap: 12px; font-weight: 600; 
      color: var(--text-muted); cursor: pointer; border-radius: 12px; transition: all 0.2s;
    }
    .nav-btn:hover { background: var(--bg-main); color: var(--primary); }
    .nav-btn.active { background: var(--primary); color: #fff; box-shadow: 0 4px 12px rgba(0, 137, 123, 0.3); }

    .settings-content { min-height: 520px; display: flex; flex-direction: column; justify-content: space-between; }
    .section h3 { margin: 0 0 32px 0; font-size: 1.4rem; font-weight: 800; color: var(--secondary); }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .form-field { display: flex; flex-direction: column; gap: 10px; }
    .form-field.full { grid-column: span 2; }
    .form-field label { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); }
    .form-field input { padding: 12px 16px; border: 1px solid var(--border); border-radius: 12px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
    .form-field input:focus { border-color: var(--primary); }

    .options-list { display: flex; flex-direction: column; gap: 16px; }
    .option-item { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f8fafc; border-radius: 16px; }
    .option-item .text h5 { margin: 0; font-size: 1rem; font-weight: 700; }
    .option-item .text p { margin: 4px 0 0 0; font-size: 0.85rem; color: var(--text-muted); }

    .switch { position: relative; display: inline-block; width: 48px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .4s; border-radius: 24px; }
    .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--primary); }
    input:checked + .slider:before { transform: translateX(24px); }

    .theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .theme-card { padding: 20px; border: 2px solid var(--border); border-radius: 20px; cursor: pointer; text-align: center; transition: all 0.2s; }
    .theme-card.active { border-color: var(--primary); background: rgba(0, 137, 123, 0.05); }
    .preview { height: 120px; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--border); }
    .preview.light { background: #fff; }
    .preview.dark { background: #0f172a; }
    .theme-card span { font-weight: 700; font-size: 0.9rem; }

    .logo-upload { display: flex; align-items: center; gap: 24px; }
    .logo-preview { width: 80px; height: 80px; border-radius: 20px; overflow: hidden; }
    .p-logo { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: 800; }
    .upload-area { flex: 1; height: 80px; border: 2px dashed var(--border); border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
    .upload-area:hover { border-color: var(--primary); color: var(--primary); background: var(--bg-main); }
    .upload-area p { margin: 4px 0 0 0; font-size: 0.8rem; font-weight: 600; }

    .footer-actions { margin-top: 40px; display: flex; gap: 16px; padding-top: 32px; border-top: 1px solid var(--border); }

    @media (max-width: 1024px) { .settings-grid { grid-template-columns: 1fr; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class SettingsComponent {
  activeSection = 'profile';
  theme = 'light';
  profile = {
    name: 'John Doe',
    email: 'john.doe@supplysync.co',
    phone: '+91 9876543210'
  };
  sections = [
    { id: 'profile', label: 'Company Profile', icon: 'User' },
    { id: 'notifications', label: 'Security Alerts', icon: 'Bell' },
    { id: 'theme', label: 'Enterprise Theme', icon: 'Sun' },
    { id: 'company', label: 'System Billing', icon: 'Settings' }
  ];
}
