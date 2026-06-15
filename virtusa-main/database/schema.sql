-- SupplySync Database Schema (PostgreSQL)

-- Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Brands Table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_id INTEGER REFERENCES brands(id),
    category_id INTEGER REFERENCES categories(id),
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    supplier_id INTEGER REFERENCES suppliers(id),
    qr_code_data TEXT,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table (Current Stock)
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 10,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock History Table (Movements)
CREATE TABLE stock_history (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    change_qty INTEGER NOT NULL,
    action_type VARCHAR(20) NOT NULL, -- ADD, REMOVE, UPDATE
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders Table
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, DELIVERED, CANCELLED
    order_date DATE DEFAULT CURRENT_DATE,
    delivery_date DATE,
    total_amount DECIMAL(12, 2) DEFAULT 0.00
);

-- Order Items (PO Line Items)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    po_id INTEGER REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- ALERT, SUCCESS, UPDATE
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data Insertions
INSERT INTO roles (name) VALUES ('STORE_MANAGER'), ('WAREHOUSE'), ('SUPPLIER'), ('FINANCE');

INSERT INTO categories (name) VALUES ('Mobile'), ('Laptop'), ('Accessories');
INSERT INTO brands (name) VALUES ('Apple'), ('Samsung'), ('Google');
