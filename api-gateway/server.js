const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(morgan('dev'))

//Login Register
app.use('/api/v1/registration', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: false
}))

app.use('/api/v1/login', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: false
}))

app.use('/api/v1/profile', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: false
}))

// Information
app.use('/api/v1/banner', createProxyMiddleware({
    target: process.env.INFORMATION_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: false
}));
app.use('/api/v1/services', createProxyMiddleware({
    target: process.env.INFORMATION_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: false
}));

//Payment
app.use('/api/v1/balance', createProxyMiddleware({
    target: process.env.PAYMENT_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: false
}));
app.use('/api/v1/transaction', createProxyMiddleware({
    target: process.env.PAYMENT_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: false
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});