import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserRole } from '../../core/auth.service';
import { LucideAngularModule } from 'lucide-angular';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="isCollapsed">
        <div class="sidebar-header">
          <div class="logo">
            <img src="assets/logo.jpg" alt="SupplySync Logo" class="logo-img">
            <span *ngIf="!isCollapsed">SupplySync</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a *ngFor="let item of menuItems" 
             [routerLink]="item.route" 
             routerLinkActive="active"
             class="nav-item">
            <lucide-icon [name]="item.icon" [size]="22"></lucide-icon>
            <span *ngIf="!isCollapsed">{{item.label}}</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="showLogoutPopup = true" class="nav-item logout-btn">
            <lucide-icon name="LogOut" [size]="20"></lucide-icon>
            <span *ngIf="!isCollapsed">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Logout Modal -->
      <div *ngIf="showLogoutPopup" class="modal-overlay">
        <div class="modal-card premium-shadow">
          <lucide-icon name="LogOut" [size]="48" class="logout-warn"></lucide-icon>
          <h3>Ready to Leave?</h3>
          <p>Are you sure you want to logout? Your unsaved changes might be lost.</p>
          <div class="modal-actions">
            <button (click)="showLogoutPopup = false" class="btn-cancel">Cancel</button>
            <button (click)="confirmLogout()" class="btn-logout">Logout</button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="main-container">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <button class="icon-btn" (click)="isCollapsed = !isCollapsed">
              <lucide-icon name="Menu" [size]="20"></lucide-icon>
            </button>
            <div class="search-bar premium-shadow">
              <lucide-icon name="Search" [size]="18"></lucide-icon>
              <input type="text" placeholder="Search SupplySync...">
            </div>
          </div>

          <div class="topbar-right">
            <div class="notification-wrap">
              <button class="icon-btn" (click)="showNotifDropdown = !showNotifDropdown">
                <lucide-icon name="Bell" [size]="20"></lucide-icon>
                <span class="badge" *ngIf="unreadCount > 0">{{unreadCount}}</span>
              </button>
              
              <!-- Global Notification Dropdown -->
              <div *ngIf="showNotifDropdown" class="notif-dropdown glass-card premium-shadow">
                <div class="notif-header">
                  <span>Notifications</span>
                  <button (click)="markAllRead()" class="mark-btn">Mark all read</button>
                </div>
                <div class="notif-list">
                  <div *ngFor="let n of notifications" class="notif-item" [class.unread]="!n.isRead">
                    <div class="n-dot" [class]="n.type"></div>
                    <div class="n-content">
                      <p>{{n.message}}</p>
                      <span>{{n.time}}</span>
                    </div>
                  </div>
                </div>
                <div class="notif-footer" routerLink="/store-manager/dashboard">View All</div>
              </div>
            </div>

            <div class="user-profile">
              <div class="avatar gradient-bg">{{roleInitials}}</div>
              <div class="user-info">
                <span class="name">{{roleName}}</span>
                <span class="role">Supply Chain System</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .sidebar {
      width: 260px;
      background: var(--sidebar);
      color: var(--sidebar-text);
      display: flex;
      flex-direction: column;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }
    .sidebar.collapsed {
      width: 80px;
    }
    .sidebar-header {
      padding: 24px;
      display: flex;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.25rem;
      font-weight: 700;
    }
    .logo-img {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: contain;
    }
    .sidebar-nav {
      flex: 1;
      padding: 12px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      border-radius: 12px;
      margin-bottom: 4px;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      font-size: 0.95rem;
    }
    .nav-item:hover, .nav-item.active {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    .nav-item.active {
      background: var(--primary);
    }
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .logout-btn:hover {
      color: var(--danger);
      background: rgba(239, 68, 68, 0.1);
    }
    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-main);
      height: 100vh;
      overflow: hidden;
    }
    .topbar {
      height: 70px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-bottom: 1px solid var(--border);
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .search-bar {
      background: var(--bg-main);
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      width: 300px;
      gap: 10px;
    }
    .search-bar input {
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      font-size: 0.9rem;
    }
    .icon-btn {
      background: transparent;
      border: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-muted);
      position: relative;
    }
    .icon-btn:hover {
      background: var(--bg-main);
      color: var(--text-main);
    }
    .badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: var(--danger);
      color: #fff;
      font-size: 10px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 12px;
      border-left: 1px solid var(--border);
    }
    
    .content-wrapper {
      flex: 1;
      overflow-y: auto;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .user-info .name {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .user-info .role {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .notification-wrap { position: relative; }
    .notif-dropdown {
      position: absolute; top: 120%; right: 0; width: 320px;
      border-radius: 20px; background: #fff; z-index: 1100;
      animation: slideUp 0.2s ease-out; border: 1px solid var(--border);
    }
    .notif-header { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
    .notif-header span { font-weight: 800; color: var(--secondary); }
    .mark-btn { font-size: 0.75rem; color: var(--primary); border: none; background: transparent; cursor: pointer; }
    .notif-list { max-height: 350px; overflow-y: auto; }
    .notif-item { padding: 12px 20px; display: flex; gap: 12px; border-bottom: 1px solid #f8fafc; transition: all 0.2s; cursor: pointer; }
    .notif-item:hover { background: var(--bg-main); }
    .notif-item.unread { background: rgba(0, 137, 123, 0.03); }
    .n-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
    .n-dot.alert { background: var(--danger); }
    .n-dot.success { background: var(--success); }
    .n-dot.update { background: #3b82f6; }
    .n-content p { margin: 0; font-size: 0.85rem; font-weight: 500; color: var(--text-main); }
    .n-content span { font-size: 0.7rem; color: var(--text-muted); }
    .notif-footer { padding: 12px; text-align: center; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); cursor: pointer; border-top: 1px solid var(--border); }

    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; z-index: 2000;
      animation: fadeIn 0.2s ease-out;
    }
    .modal-card {
      background: #fff; padding: 40px; border-radius: 24px; text-align: center;
      max-width: 400px; width: 90%; animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .logout-warn { color: var(--danger); margin-bottom: 20px; }
    .modal-card h3 { margin: 0 0 12px 0; font-size: 1.5rem; font-weight: 800; }
    .modal-card p { color: var(--text-muted); margin-bottom: 32px; font-size: 0.95rem; }
    .modal-actions { display: flex; gap: 12px; }
    .modal-actions button { flex: 1; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-cancel { border: 1px solid var(--border); background: #fff; }
    .btn-cancel:hover { background: var(--bg-main); }
    .btn-logout { border: none; background: var(--danger); color: #fff; }
    .btn-logout:hover { opacity: 0.9; transform: scale(1.02); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        z-index: 1000;
        height: 100%;
        left: -260px;
      }
      .sidebar:not(.collapsed) {
        left: 0;
      }
      .search-bar {
        display: none;
      }
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  showLogoutPopup = false;
  showNotifDropdown = false;
  unreadCount = 2;
  isCollapsed = false;
  role: UserRole | null = null;
  menuItems: SidebarItem[] = [];
  notifications = [
    { message: 'iPhone 15 stock critical: 2 left', time: '10m ago', type: 'alert', isRead: false },
    { message: 'PO #9401 approved by Finance', time: '1h ago', type: 'success', isRead: false },
    { message: 'Warehouse Section A updated', time: '3h ago', type: 'update', isRead: true }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    if (!this.role) {
      this.router.navigate(['/login']);
      return;
    }
    this.menuItems = this.getMenuItems(this.role);
  }

  markAllRead() {
    this.notifications.forEach(n => n.isRead = true);
    this.unreadCount = 0;
  }

  get roleName(): string {
    return this.role?.split('_').map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(' ') || 'User';
  }

  get roleInitials(): string {
    return this.role?.split('_').map((w: string) => w[0]).join('') || 'U';
  }

  confirmLogout() {
    this.showLogoutPopup = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private getMenuItems(role: UserRole): SidebarItem[] {
    const configs: Record<UserRole, SidebarItem[]> = {
      'STORE_MANAGER': [
        { label: 'Dashboard', route: '/store-manager/dashboard', icon: 'LayoutDashboard' },
        { label: 'Product Management', route: '/store-manager/products', icon: 'Package' },
        { label: 'Inventory', route: '/store-manager/inventory', icon: 'Activity' },
        { label: 'Purchase Order', route: '/store-manager/orders', icon: 'ShoppingCart' },
        { label: 'Report & Analysis', route: '/store-manager/reports', icon: 'BarChart3' },
        { label: 'Settings', route: '/store-manager/settings', icon: 'Settings' }
      ],
      'WAREHOUSE': [
        { label: 'Dashboard', route: '/warehouse/dashboard', icon: 'LayoutDashboard' },
        { label: 'Stock Receipt Entry', route: '/warehouse/stock-receipt', icon: 'PackagePlus' },
        { label: 'Inventory Updates', route: '/warehouse/inventory-updates', icon: 'RefreshCw' },
        { label: 'Stock Count', route: '/warehouse/stock-count', icon: 'ClipboardCheck' },
        { label: 'Dispatch Tracking', route: '/warehouse/dispatch-tracking', icon: 'Truck' },
        { label: 'Settings', route: '/warehouse/settings', icon: 'Settings' }
      ],
      'FINANCE': [
        { label: 'Dashboard', route: '/finance/dashboard', icon: 'LayoutDashboard' },
        { label: 'PO Approvals', route: '/finance/approvals', icon: 'CheckCircle2' },
        { label: 'Financial Reports', route: '/finance/reports', icon: 'FileText' },
        { label: 'Supplier Payments', route: '/finance/payments', icon: 'Wallet' },
        { label: 'Cost Analytics', route: '/finance/analytics', icon: 'BarChart3' },
        { label: 'Inventory Value', route: '/finance/valuation', icon: 'Landmark' },
        { label: 'Audit Logs', route: '/finance/audit', icon: 'Clock' },
        { label: 'Settings', route: '/finance/settings', icon: 'Settings' }
      ],
      'SUPPLIER': [
        { label: 'Dashboard', route: '/supplier/dashboard', icon: 'LayoutDashboard' },
        { label: 'Purchase Orders', route: '/supplier/orders', icon: 'ShoppingCart' },
        { label: 'Schedules', route: '/supplier/schedules', icon: 'Calendar' },
        { label: 'ETA Confirmation', route: '/supplier/eta', icon: 'Clock' },
        { label: 'Order History', route: '/supplier/history', icon: 'FileText' },
        { label: 'Invoice Upload', route: '/supplier/invoices', icon: 'FileUp' },
        { label: 'Notifications', route: '/supplier/notifications', icon: 'Bell' },
        { label: 'Profile', route: '/supplier/profile', icon: 'User' }
      ],
      'SUPER_ADMIN': [
        { label: 'Dashboard', route: '/super-admin/dashboard', icon: 'LayoutDashboard' },
        { label: 'Users', route: '/super-admin/users', icon: 'Users' },
        { label: 'Roles', route: '/super-admin/roles', icon: 'ShieldCheck' },
        { label: 'Stores', route: '/super-admin/stores', icon: 'Store' },
        { label: 'Suppliers', route: '/super-admin/suppliers', icon: 'Truck' },
        { label: 'Analytics', route: '/super-admin/analytics', icon: 'BarChart3' },
        { label: 'Audit Logs', route: '/super-admin/audit', icon: 'MonitorDot' },
        { label: 'Settings', route: '/super-admin/settings', icon: 'Settings' }
      ]
    };
    return configs[role] || [];
  }
}

