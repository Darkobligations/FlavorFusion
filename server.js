// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from 'public' directory
app.use(express.static('public'));

// Create database connection
const db = new sqlite3.Database('shop.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the shop database.');
});

// Initialize database tables
db.serialize(() => {
    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        image_url TEXT
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Order items table
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        price DECIMAL(10,2),
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    )`);
});

// API Endpoints
// Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create new order
app.post('/api/orders', (req, res) => {
    const { customerName, email, address, totalAmount, items } = req.body;
    
    db.run(`INSERT INTO orders (customer_name, email, address, total_amount) 
            VALUES (?, ?, ?, ?)`,
        [customerName, email, address, totalAmount],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            const orderId = this.lastID;
            
            // Insert order items
            const stmt = db.prepare(`INSERT INTO order_items 
                (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`);
                
            items.forEach(item => {
                stmt.run([orderId, item.productId, item.quantity, item.price]);
            });
            
            stmt.finalize();
            
            res.json({
                message: "Order created successfully",
                orderId: orderId
            });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});