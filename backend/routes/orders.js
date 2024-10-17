const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.post("/create_order", (req, res) => {
    const {
        type,
        weight,
        name,
        company_name,
        street1,
        street2,
        zip_code,
        city,
        state,
        country,
        total_order_amount,
        template // only applicable if type is USPS Priority
    } = req.body;

    // Prepare the SQL query
    const sql = `INSERT INTO Create_order (type, weight, name, company_name, street1, street2, zip_code, city, state, country, total_order_amount, template, order_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    // Execute the query
    db.query(sql, [type, weight, name, company_name, street1, street2, zip_code, city, state, country, total_order_amount, template], (error, results) => {
        if (error) {
            console.error('Error inserting data: ', error);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'Order created successfully', orderId: results.insertId });
    });
});


// Create a new order
router.post('/orders', async (req, res) => {
    const { order_type, weight, template, total_price, fromAddress, toAddress } = req.body;

    // Valid order types
    const validOrderTypes = ['USPS Ground OZ', 'USPS Ground lb', 'USPS Priority', 'USPS Express', 'USPS Priority V2'];

    // Validate order_type
    if (!validOrderTypes.includes(order_type)) {
        return res.status(400).json({ error: 'Invalid order type' });
    }

    try {
        // Insert from address
        const fromAddressResult = await db.promise().query('INSERT INTO addresses SET ?', fromAddress);
        const fromAddressId = fromAddressResult[0].insertId; // Adjust to access the result correctly

        // Insert to address
        const toAddressResult = await db.promise().query('INSERT INTO addresses SET ?', toAddress);
        const toAddressId = toAddressResult[0].insertId; // Adjust to access the result correctly

        // Insert order
        const orderResult = await db.promise().query('INSERT INTO uspsorders SET ?', {
            order_type,
            weight,
            template: template || null, // Allowing template to be null
            total_price,
            from_address_id: fromAddressId,
            to_address_id: toAddressId,
            order_date: new Date(), // Get current date and time for insertion
            status: 'Pending' // Default status
        });

        res.status(201).json({
            message: 'Order created successfully', // Success message
            orderId: orderResult[0].insertId // Adjust to access the result correctly
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});




router.get("/OrdersDetails", async (req, res) => {
    const query = 'SELECT * FROM Create_order';
    db.query(query, (err, result) => {
        if (err) throw err;
        if (result.length < 0) {
            res.json({ success: true, message: 'No data available' });
        } else {
            res.json(result)
        }
    });
})


// Route to get all USPS orders
router.get('/getUSPSOrders', (req, res) => {
    const sql = `
        SELECT 
            uspsorders.id, 
            uspsorders.order_type, 
            uspsorders.weight, 
            uspsorders.template, 
            uspsorders.total_price, 
            uspsorders.order_date, 
            uspsorders.status,
            fromAddr.name AS from_name, 
            fromAddr.company_name AS from_company, 
            fromAddr.street1 AS from_street1, 
            fromAddr.city AS from_city, 
            fromAddr.state AS from_state, 
            fromAddr.zip_code AS from_zip,
            toAddr.name AS to_name, 
            toAddr.company_name AS to_company, 
            toAddr.street1 AS to_street1, 
            toAddr.city AS to_city, 
            toAddr.state AS to_state, 
            toAddr.zip_code AS to_zip
        FROM uspsorders uspsorders
        JOIN addresses fromAddr ON uspsorders.from_address_id = fromAddr.id
        JOIN addresses toAddr ON uspsorders.to_address_id = toAddr.id
    `;
    
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        // Return data in JSON format
        return res.status(200).json(results);
    });
});

router.post("/getPrices", async (req, res) => {
    const { type } = req.body; // Get type from the request body

    // If type is provided, fetch the price for that specific type
    if (type) {
        const query = 'SELECT price FROM USPS_Pricing WHERE type = ?';
        db.query(query, [type], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.json({ success: true, price: result[0].price }); // Return price for the given type
            } else {
                res.json({ success: false, message: 'No price available for this type' });
            }
        });
    } 
    // If no type is provided, return all prices
    else {
        const query = 'SELECT * FROM USPS_Pricing';
        db.query(query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.json(result); // Return all pricing details as JSON
            } else {
                res.json({ success: true, message: 'No data available' });
            }
        });
    }
});




module.exports = router;