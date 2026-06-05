const { initDB } = require('./src/config/db')
const routes = require('./src/routes/routes')
const express = require('express')
const errorMiddleware = require('./src/middlewares/errormiddleware');
const app = express()
const { consumerPayment } = require('./src/utils/rabbitmq');
const PORT = process.env.PORT || 3002;

app.use(express.json())

app.use('/api/v1', routes)

app.use(errorMiddleware)
initDB().then(async () => {
    await consumerPayment();
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

