const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payment');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(express.json({
  verify: (req, _, buf) => {
      req.rawBody = buf.toString();
  }
}))
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Use admin routes
app.use('/api', adminRoutes);
app.use('/api',paymentRoutes);
// Default route
app.get('/', (req, res) => {
    console.log("Default route");
    res.send("Welcome to the API!");
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


