const transactionServices = require('../services/transactionservices')


const transactionController = {

   getTransaction: async  (req, res, next) => {
        const limit = parseInt(req.query.limit) || 0
        const offset = parseInt(req.query.offset) || 0
        const transactions = await transactionServices.getTransaction(
                req.user.id,
                limit,
                offset
            );
        return res.status(200).json({
                status: 0,
                message: "Get transaksi berhasil",
                data: {limit : limit, offset: offset, records:[transactions]}
            });
   },

   postTransaction: async (req, res, next) => {
        const transaction = await transactionServices.postTransaction(req)

        if (transaction.error) {
        return res.status(400).json({
            status: 102,
            message: transaction.error,
            data: null
        });
    }

        return res.status(200).json({
                status: 0,
                message: "Transaksi berhasil",
                data: {
                    invoice_number: transaction.transaction.invoice_number,
                    service_code: transaction.transaction.service_code,
                    transaction_type: transaction.transaction.transaction_type,
                    total_amount: transaction.transaction.total_amount,
                    created_on: transaction.transaction.created_at
        }
    });
    }
   }


module.exports = transactionController