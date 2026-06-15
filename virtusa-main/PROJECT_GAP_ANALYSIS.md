# PROJECT GAP ANALYSIS: SupplySync Inventory & Order Management System

This document outlines the current state of the SupplySync project, identifying existing functionality, gaps in implementation, security vulnerabilities, integration issues, and a roadmap to project completion.

---

## 1. Existing Functionality

### Angular Frontend
*   **Routing & Skeleton Structure**: Basic routes for 5 user roles (`STORE_MANAGER`, `WAREHOUSE`, `FINANCE`, `SUPPLIER`, `SUPER_ADMIN`) are set up in `src/app/app.routes.ts`.
*   **Authentication Portal (Mock)**: A mock login screen (`src/app/features/auth/login.component.ts`) that allows selecting a role and navigating to the corresponding module dashboard without password validation.
*   **Role Layout**: A navigation sidebar wrapper (`src/app/shared/layouts/main-layout.component.ts`) configured to display modules corresponding to the active role.
*   **Store Manager Modules (Partial UI)**:
    *   **Dashboard**: Features mock stats cards, sales chart widgets, activity feed, and mock notifications list.
    *   **Product Catalog**: Features a mockup of a QR code camera scanner (simulated timer and static results) and a modal form that adds items in-memory.
*   **Placeholder Pages**: Automatic boilerplate UI screens generated using `<app-page-placeholder>` across all other modules.

### Spring Boot Backend
*   **Project Setup**: Core Maven config (`pom.xml`) and main class (`InventoryApplication.java`) are present.
*   **Partial JPA Entity Definitions**: Entities for `Inventory`, `Notification`, and `OrderItem` are defined.
*   **Mock Store Manager Controller**: `StoreManagerController.java` provides REST endpoints but is completely non-functional due to compiler errors.

### PostgreSQL Database
*   **Database Schema**: A relational schema (`database/schema.sql`) contains tables for `roles`, `users`, `categories`, `brands`, `suppliers`, `products`, `inventory`, `stock_history`, `purchase_orders`, `order_items`, and `notifications`.
*   **Seed Data**: Insertion queries for role definitions, brands, and categories.

---

## 2. Existing APIs
The following REST endpoints are declared in `StoreManagerController.java` but **do not work** because they depend on missing repositories and service layers:
*   `GET /api/store-manager/dashboard/stats`
*   `GET /api/store-manager/dashboard/notifications`
*   `GET /api/store-manager/products`
*   `POST /api/store-manager/products`
*   `GET /api/store-manager/products/scan/{sku}`
*   `GET /api/store-manager/inventory/summary`
*   `GET /api/store-manager/orders`
*   `POST /api/store-manager/orders`
*   `GET /api/store-manager/reports/generate-pdf`

---

## 3. Existing Database Tables
The following tables are defined in `schema.sql`:
1.  `roles`: Role catalog.
2.  `users`: Registered users with hashed passwords and role links.
3.  `categories`: Product categories.
4.  `brands`: Product brand catalog.
5.  `suppliers`: Supplier contact details.
6.  `products`: Detailed item info including SKU and QR references.
7.  `inventory`: Real-time stock counts and thresholds.
8.  `stock_history`: Historical ledger of stock adjustments.
9.  `purchase_orders`: Top-level purchase requests.
10. `order_items`: Line items inside purchase orders.
11. `notifications`: Alert history for low stock or order updates.

---

## 4. Existing User Roles
*   **Database Roles**: `STORE_MANAGER`, `WAREHOUSE`, `SUPPLIER`, `FINANCE`
*   **Frontend Roles**: `STORE_MANAGER`, `WAREHOUSE`, `FINANCE`, `SUPPLIER`, `SUPER_ADMIN`
*   ⚠️ **Gap**: The role `SUPER_ADMIN` is wired into the Angular router and login views but does not exist in the database configuration script (`schema.sql`).

---

## 5. Missing Frontend Functionality
*   **HTTP Client Layer**: No instance of Angular `HttpClient` is used. All data is hardcoded or mocked in the local component memory.
*   **JWT Security & Session Interceptors**: Missing an HTTP interceptor to automatically attach authorization tokens to backend requests.
*   **Routing Guards**: No `CanActivate` guards exist to verify roles. A user can access `/super-admin` or `/finance` pages simply by changing the URL in the browser address bar.
*   **Production QR/Barcode Scanner**: Scanner utilizes a timer delay simulation rather than actual video capture streams. Needs connection to standard browser APIs or libraries (e.g., `html5-qrcode`).
*   **Feature Page Implementations**: Over 30 routes load the placeholder view. Complete functional forms, tables, and charts are required for:
    *   *Warehouse*: Stock counts, physical reconciliation, and delivery dispatches.
    *   *Finance*: Payment listings, inventory valuations, and order approvals.
    *   *Supplier*: ETAs, schedules, invoice templates, and shipment logs.
    *   *Admin*: User creation forms, system settings, and audit trail tables.
*   **Global Error Handling**: No notification alert service or handling of HTTP error codes (e.g., 401 Unauthorized, 500 Server Error).

---

## 6. Missing Backend Functionality

### Critical Compilation Issues
The backend is completely broken and cannot be built or run due to missing dependencies:
1.  **Missing Entity Definitions**:
    *   `com.retail.inventory.model.Product` (referenced in `Inventory.java` and `OrderItem.java`) does not exist.
    *   `com.retail.inventory.model.PurchaseOrder` (referenced in `StoreManagerController.java`) does not exist.
    *   Other relational mapping files (`User.java`, `Role.java`, `Category.java`, `Brand.java`, `Supplier.java`, `StockHistory.java`) are also missing.
2.  **Missing Repository Interfaces**:
    *   `ProductRepository`, `InventoryRepository`, and `PurchaseOrderRepository` are referenced in the controller but are missing.
3.  **Missing Service Implementations**:
    *   `DashboardService` is imported and used in the controller but does not exist.

### System Infrastructure Gaps
*   **Database Settings**: The project lacks a `src/main/resources` directory and has no `application.properties` or `application.yml` file. Database host URL, port, credentials, and JPA dialect configurations are completely missing.
*   **Authentication & Web Security**: No Spring Security framework, password hashing (BCrypt), or JWT filters are implemented.
*   **PDF Exporter Engine**: The reports endpoint returns an empty array instead of compiling data into a PDF.

---

## 7. Missing Database Entities
*   **Stores Table**: The frontend defines a `super-admin/stores` route, but there is no relational entity in the database to map multiple retail outlets.
*   **Audit Logs Ledger**: The frontend references `audit` dashboards under Admin and Finance, but no system log table exists in `schema.sql` to capture activities.
*   **Damaged Goods Registry**: The dashboard reports "damaged count", but there are no database fields or history records tracking stock write-offs.

---

## 8. Missing APIs
Additional controllers and endpoints need to be built to support other roles:
*   **Authentication Controller**: `/api/auth/login`, `/api/auth/register`, `/api/auth/profile`.
*   **Warehouse Controller**: `/api/warehouse/reconciliation`, `/api/warehouse/dispatch`, `/api/warehouse/stock-receipt`.
*   **Finance Controller**: `/api/finance/orders/{id}/approve`, `/api/finance/payments`, `/api/finance/valuation`.
*   **Supplier Controller**: `/api/supplier/orders`, `/api/supplier/orders/{id}/eta`, `/api/supplier/invoices`.
*   **Admin Controller**: `/api/admin/users`, `/api/admin/roles`, `/api/admin/stores`, `/api/admin/audit-logs`.

---

## 9. Security Gaps
*   **No API Access Controls**: All backend endpoints are currently public. Any client can fetch inventory details or post purchase orders.
*   **Cleartext Passwords**: No encryption configuration is implemented for user credentials.
*   **Insecure Session Storage**: Frontend uses unencrypted local storage (`localStorage.setItem('user_role', role)`) to determine permissions, which can be easily tampered with.
*   **Missing CORS Configurations**: Basic `@CrossOrigin` is hardcoded to `http://localhost:4200` but lacks production-ready configuration.

---

## 10. Integration Gaps
*   **Environment Configuration**: Frontend lacks environment setups (`environment.ts`) referencing the backend port.
*   **Asynchronous Processing**: No websocket or polling system connects backend real-time warnings (like low stock triggers) directly to the frontend header.
*   **Data Models Alignment**: Type interfaces matching database columns are missing on the Angular side.

---

## 📊 Project Completion Estimation

| Component | Status | Estimated Completion |
| :--- | :--- | :--- |
| **Database Schema** | Relational mappings and seeds mostly complete, minor tables missing. | **90%** |
| **Spring Boot Backend** | Broken code structures, missing models, configurations, security, and services. | **15%** |
| **Angular Frontend** | UI layout, CSS style guides, and mock dashboards are active, but pages are placeholders. | **30%** |
| **Total Project Progress** | **System integration and data flow have not been initiated.** | **~25%** |

---

## 🚀 High-Priority Tasks & Implementation Roadmap

### Phase 1: Backend Infrastructure & Models
1.  Add `src/main/resources/application.properties` with database setup.
2.  Define missing database model entities (`Product`, `PurchaseOrder`, `User`, `Role`, `Supplier`, etc.).
3.  Create JPA Repository interfaces for all tables.
4.  Implement `DashboardService` with calculations for products, low stock, and recent actions.

### Phase 2: Security & Session Setup
1.  Add Spring Security & JWT dependencies to `pom.xml`.
2.  Implement user login API (`POST /api/auth/login`) with BCrypt password checking.
3.  Write frontend auth interceptors to store and send the JWT token.
4.  Configure `AuthGuard` in Angular to restrict unauthorized role access.

### Phase 3: Core CRUD Integration
1.  Replace frontend mock models with interfaces.
2.  Import `HttpClient` in frontend and write service layers for products, stock, and orders.
3.  Connect `ProductsComponent` and `DashboardComponent` to real REST APIs.

### Phase 4: Role Portal Implementation
1.  Implement backend and frontend logic for physical stock count and reconciliation (Warehouse).
2.  Implement approval API endpoints for pending purchase orders (Finance).
3.  Implement real-time notification alerts using SSE (Server-Sent Events) or websockets.

### Phase 5: Supply Chain & PDF Modules
1.  Create API endpoints for Supplier interaction (Invoices, ETAs).
2.  Integrate a PDF generation library (like iText or OpenPDF) into the Spring Boot backend reports service.
3.  Allow downloading and exporting financial spreadsheets.

### Phase 6: Admin Management & Logs
1.  Complete the user management user interface (Admin).
2.  Add relational configurations for multiple Store locations.
3.  Connect audit log triggers on the backend to capture critical actions (approvals, deletes).
