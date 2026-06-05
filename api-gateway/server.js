const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(morgan('dev'))

// Generic proxy function using native fetch
const proxy = (targetUrl) => {
    return async (req, res, next) => {
        try {
            // Get the target URL from env or use fallback
            const target = typeof targetUrl === 'function' ? targetUrl() : targetUrl;
            
            // Forward the full path (including /api/v1/...)
            const url = `${target}${req.url}`;
            
            console.log(`[PROXY] ${req.method} ${url}`);
            
            // Get request body for POST/PUT
            let body = null;
            if (req.method !== 'GET' && req.method !== 'HEAD') {
                body = JSON.stringify(req.body);
            }
            
            // Forward the request
            const response = await fetch(url, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(req.headers.authorization ? { 'Authorization': req.headers.authorization } : {})
                },
                body: body
            });
            
            // Get the response body
            const data = await response.json();
            
            // Send back the response
            res.status(response.status).json(data);
        } catch (err) {
            console.error(`[PROXY ERROR] ${err.message}`);
            next(err);
        }
    };
};

// Login Register routes
app.use('/api/v1/registration', proxy(() => process.env.LOGIN_REG_URL || 'http://localhost:3000'));
app.use('/api/v1/login', proxy(() => process.env.LOGIN_REG_URL || 'http://localhost:3000'));
app.use('/api/v1/profile', proxy(() => process.env.LOGIN_REG_URL || 'http://localhost:3000'));

// Information routes
app.use('/api/v1/banner', proxy(() => process.env.INFORMATION_URL || 'http://localhost:3001'));
app.use('/api/v1/services', proxy(() => process.env.INFORMATION_URL || 'http://localhost:3001'));

// Payment routes
app.use('/api/v1/balance', proxy(() => process.env.PAYMENT_URL || 'http://localhost:3002'));
app.use('/api/v1/transaction', proxy(() => process.env.PAYMENT_URL || 'http://localhost:3002'));

// 404 handler
app.use((req, res) => {
    console.log(`[404] ${req.method} ${req.url}`);
    res.status(404).json({ status: 102, message: 'Route not found', data: null });
});

app.listen(PORT, () => {
    console.log(`=== GATEWAY STARTED ===`);
    console.log(`PORT: ${PORT}`);
    console.log(`LOGIN_REG_URL: ${process.env.LOGIN_REG_URL || 'http://localhost:3000'}`);
    console.log(`INFORMATION_URL: ${process.env.INFORMATION_URL || 'http://localhost:3001'}`);
    console.log(`PAYMENT_URL: ${process.env.PAYMENT_URL || 'http://localhost:3002'}`);
    console.log(`========================`);
});