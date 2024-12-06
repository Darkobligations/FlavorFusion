const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'shop.db');t
console.log('Database path:', dbPath);


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to the shop database:", err.message);
    } else {
        console.log('Connected to the shop database.');
    }
});

// Initialize database tables
db.serialize(() => {
    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        total_amount REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Order Items table
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    )`);
});

// Create new order with items
app.post('/api/orders', async (req, res) => {
    const { customerName, email, address, totalAmount, items } = req.body;

    // Input validation
    if (!customerName || !email || !address || isNaN(totalAmount) || !Array.isArray(items)) {
        return res.status(400).json({ 
            error: "Invalid input data",
            details: "All fields are required and items must be an array"
        });
    }

    // Validate items
    if (!items.every(item => item.name && item.quantity && item.price)) {
        return res.status(400).json({
            error: "Invalid items data",
            details: "Each item must have a name, quantity, and price"
        });
    }

    // Start a database transaction
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        db.run(
            `INSERT INTO orders (customer_name, email, address, total_amount) 
             VALUES (?, ?, ?, ?)`,
            [customerName, email, address, parseFloat(totalAmount).toFixed(2)],
            function(err) {
                if (err) {
                    console.error('Error creating order:', err);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: "Failed to create order" });
                }

                const orderId = this.lastID;
                let itemsProcessed = 0;

                // Insert each item
                items.forEach((item) => {
                    db.run(
                        `INSERT INTO order_items (order_id, item_name, quantity, price) 
                         VALUES (?, ?, ?, ?)`,
                        [orderId, item.name, item.quantity, parseFloat(item.price).toFixed(2)],
                        (err) => {
                            if (err) {
                                console.error('Error inserting order item:', err);
                                db.run('ROLLBACK');
                                return res.status(500).json({ error: "Failed to create order items" });
                            }

                            itemsProcessed++;
                            if (itemsProcessed === items.length) {
                                db.run('COMMIT', (err) => {
                                    if (err) {
                                        console.error('Error committing transaction:', err);
                                        db.run('ROLLBACK');
                                        return res.status(500).json({ error: "Failed to complete order" });
                                    }
                                    res.json({
                                        message: "Order created successfully",
                                        orderId: orderId
                                    });
                                });
                            }
                        }
                    );
                });
            }
        );
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});