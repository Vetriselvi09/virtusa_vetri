import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'store-manager',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/store-manager/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'products', loadComponent: () => import('./features/store-manager/products/products.component').then(c => c.ProductsComponent) },
      { path: 'inventory', loadComponent: () => import('./features/store-manager/inventory/inventory.component').then(c => c.InventoryComponent) },
      { path: 'orders', loadComponent: () => import('./features/store-manager/orders/orders.component').then(c => c.OrdersComponent) },
      { path: 'reports', loadComponent: () => import('./features/store-manager/reports/reports.component').then(c => c.ReportsComponent) },
      { path: 'settings', loadComponent: () => import('./features/store-manager/settings/settings.component').then(c => c.SettingsComponent) },
    ]
  },
  {
    path: 'warehouse',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/warehouse/dashboard/dashboard.component').then(c => c.WarehouseDashboardComponent) },
      { path: 'stock-receipt', loadComponent: () => import('./features/warehouse/stock-receipt/stock-receipt.component').then(c => c.StockReceiptComponent) },
      { path: 'inventory-updates', loadComponent: () => import('./features/warehouse/inventory-updates/inventory-updates.component').then(c => c.InventoryUpdatesComponent) },
      { path: 'stock-count', loadComponent: () => import('./features/warehouse/stock-count/stock-count.component').then(c => c.StockCountComponent) },
      { path: 'dispatch-tracking', loadComponent: () => import('./features/warehouse/dispatch-tracking/dispatch-tracking.component').then(c => c.DispatchTrackingComponent) },
      { path: 'settings', loadComponent: () => import('./features/warehouse/settings/settings.component').then(c => c.WarehouseSettingsComponent) },
    ]
  },
  {
    path: 'finance',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/finance/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'approvals', loadComponent: () => import('./features/finance/approvals/approvals.component').then(c => c.ApprovalsComponent) },
      { path: 'reports', loadComponent: () => import('./features/finance/reports/reports.component').then(c => c.ReportsComponent) },
      { path: 'payments', loadComponent: () => import('./features/finance/payments/payments.component').then(c => c.PaymentsComponent) },
      { path: 'analytics', loadComponent: () => import('./features/finance/analytics/analytics.component').then(c => c.AnalyticsComponent) },
      { path: 'valuation', loadComponent: () => import('./features/finance/valuation/valuation.component').then(c => c.ValuationComponent) },
      { path: 'audit', loadComponent: () => import('./features/finance/audit/audit.component').then(c => c.AuditComponent) },
      { path: 'settings', loadComponent: () => import('./features/finance/settings/settings.component').then(c => c.SettingsComponent) },
    ]
  },
  {
    path: 'supplier',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/supplier/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'orders', loadComponent: () => import('./features/supplier/orders/orders.component').then(c => c.OrdersComponent) },
      { path: 'schedules', loadComponent: () => import('./features/supplier/schedules/schedules.component').then(c => c.SchedulesComponent) },
      { path: 'eta', loadComponent: () => import('./features/supplier/eta/eta.component').then(c => c.EtaComponent) },
      { path: 'history', loadComponent: () => import('./features/supplier/history/history.component').then(c => c.HistoryComponent) },
      { path: 'invoices', loadComponent: () => import('./features/supplier/invoices/invoices.component').then(c => c.InvoicesComponent) },
      { path: 'notifications', loadComponent: () => import('./features/supplier/notifications/notifications.component').then(c => c.NotificationsComponent) },
      { path: 'profile', loadComponent: () => import('./features/supplier/profile/profile.component').then(c => c.ProfileComponent) },
    ]
  },
  {
    path: 'super-admin',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/super-admin/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./features/super-admin/users/users.component').then(c => c.UsersComponent) },
      { path: 'roles', loadComponent: () => import('./features/super-admin/roles/roles.component').then(c => c.RolesComponent) },
      { path: 'stores', loadComponent: () => import('./features/super-admin/stores/stores.component').then(c => c.StoresComponent) },
      { path: 'suppliers', loadComponent: () => import('./features/super-admin/suppliers/suppliers.component').then(c => c.SuppliersComponent) },
      { path: 'analytics', loadComponent: () => import('./features/super-admin/analytics/analytics.component').then(c => c.AnalyticsComponent) },
      { path: 'audit', loadComponent: () => import('./features/super-admin/audit/audit.component').then(c => c.AuditComponent) },
      { path: 'settings', loadComponent: () => import('./features/super-admin/settings/settings.component').then(c => c.SettingsComponent) },
    ]
  }
];

