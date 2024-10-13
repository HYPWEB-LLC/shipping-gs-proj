const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.post("/order", (req, res) => {
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



router.get("/OrdersDetails",async(req,res)=>{
    const query = 'SELECT * FROM Create_order';
    db.query(query,(err, result) => {
        if (err) throw err;
        if (result.length < 0) {
            res.json({ success: true, message: 'No data available' });
        } else {
            res.json(result)
        }
    });
})

module.exports = router;