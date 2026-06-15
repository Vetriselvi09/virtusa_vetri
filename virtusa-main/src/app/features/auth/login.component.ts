import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../core/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="login-container gradient-bg">
      <div class="login-card glass-card">
        <div class="login-header">
          <h1>RetailPro</h1>
          <p>Login to your portal</p>
        </div>

        <div class="role-selection">
          <label>Select Your Role</label>
          <div class="role-grid">
            <div *ngFor="let role of roles" 
                 [class.active]="selectedRole === role.id"
                 (click)="selectedRole = role.id"
                 class="role-item">
              <lucide-icon [name]="role.icon" [size]="24"></lucide-icon>
              <span>{{role.name}}</span>
            </div>
          </div>
        </div>

        <form (submit)="onLogin($event)">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@company.com" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn-primary login-btn">
            Sign In
          </button>
        </form>

        <div class="login-footer">
          Don't have an account? <a href="#">Create one</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-card {
      width: 100%;
      max-width: 480px;
      padding: 40px;
      border-radius: 24px;
      color: var(--text-main);
    }
    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .login-header h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -1px;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .login-header p {
      color: rgba(255,255,255,0.8);
      margin-top: 8px;
    }
    .role-selection {
      margin-bottom: 24px;
    }
    .role-selection label {
      display: block;
      margin-bottom: 12px;
      font-weight: 600;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.9);
    }
    .role-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .role-item {
      padding: 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      color: #fff;
    }
    .role-item span {
      font-size: 0.75rem;
      margin-top: 8px;
    }
    .role-item:hover {
      background: rgba(255,255,255,0.2);
    }
    .role-item.active {
      background: #fff;
      color: var(--primary);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.9);
    }
    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.1);
      color: #fff;
      outline: none;
    }
    .form-group input::placeholder {
      color: rgba(255,255,255,0.4);
    }
    .login-btn {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      border: none;
      font-weight: 700;
      font-size: 1rem;
      margin-top: 24px;
      cursor: pointer;
    }
    .login-footer {
      margin-top: 24px;
      text-align: center;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
    }
    .login-footer a {
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  selectedRole: UserRole = 'STORE_MANAGER';
  
  roles = [
    { id: 'STORE_MANAGER' as UserRole, name: 'Store Manager', icon: 'Briefcase' },
    { id: 'WAREHOUSE' as UserRole, name: 'Warehouse', icon: 'Truck' },
    { id: 'FINANCE' as UserRole, name: 'Finance Admin', icon: 'PieChart' },
    { id: 'SUPPLIER' as UserRole, name: 'Supplier', icon: 'UserCircle' },
    { id: 'SUPER_ADMIN' as UserRole, name: 'Super Admin', icon: 'ShieldCheck' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(e: Event) {
    e.preventDefault();
    this.authService.setRole(this.selectedRole);
    
    const routesMap: Record<UserRole, string> = {
      'STORE_MANAGER': '/store-manager',
      'WAREHOUSE': '/warehouse',
      'FINANCE': '/finance',
      'SUPPLIER': '/supplier',
      'SUPER_ADMIN': '/super-admin'
    };

    this.router.navigate([routesMap[this.selectedRole]]);
  }
}

