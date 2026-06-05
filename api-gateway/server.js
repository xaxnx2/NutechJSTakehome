const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const { swaggerUi, specs } = require('./swagger');

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Take Home Test API Docs',
}));

// Health check 
app.get('/health', (req, res) => {
    res.json({
        status: 'running',
        port: PORT,
        env: {
            LOGIN_REG_URL: process.env.LOGIN_REG_URL || 'NOT SET (fallback: http://localhost:3000)',
            INFORMATION_URL: process.env.INFORMATION_URL || 'NOT SET (fallback: http://localhost:3001)',
            PAYMENT_URL: process.env.PAYMENT_URL || 'NOT SET (fallback: http://localhost:3002)',
        }
    });
});


/**
 * @swagger
 * /api/v1/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, first_name, last_name, password]
 *             properties:
 *               email: { type: string, format: email }
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Registration successful }
 */
app.use('/api/v1/registration', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}))


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Login successful, returns JWT token }
 */
app.use('/api/v1/login', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}))


/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: User profile data }
 */
app.use('/api/v1/profile', createProxyMiddleware({
    target: process.env.LOGIN_REG_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}))


/**
 * @swagger
 * /api/v1/banner:
 *   get:
 *     summary: Get all banners
 *     tags: [Information]
 *     responses:
 *       200: { description: List of banners }
 */
app.use('/api/v1/banner', createProxyMiddleware({
    target: process.env.INFORMATION_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl,
}));


/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     summary: Get all services
 *     tags: [Information]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of services with tariffs }
 */
app.use('/api/v1/services', createProxyMiddleware({
    target: process.env.INFORMATION_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));


/**
 * @swagger
 * /api/v1/balance:
 *   get:
 *     summary: Get user balance
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Current balance }
 */
app.use('/api/v1/balance', createProxyMiddleware({
    target: process.env.PAYMENT_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));


/**
 * @swagger
 * /api/v1/transaction:
 *   post:
 *     summary: Create transaction
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [service_code]
 *             properties:
 *               service_code: { type: string }
 *     responses:
 *       200: { description: Transaction created }
 *   get:
 *     summary: Get transaction history
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Transaction history }
 */
app.use('/api/v1/transaction', createProxyMiddleware({
    target: process.env.PAYMENT_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));


/**
 * @swagger
 * /api/v1/topup:
 *   post:
 *     summary: Top up user balance
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: integer, minimum: 1000 }
 *     responses:
 *       200: { description: Top up successful }
 */
app.use('/api/v1/topup', createProxyMiddleware({
    target: process.env.PAYMENT_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});