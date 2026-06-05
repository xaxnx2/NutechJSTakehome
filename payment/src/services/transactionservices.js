const transactionRepo = require('../repositories/transactionrepo')
const balanceRepo = require('../repositories/balancerepo')
const { randomUUID } = require('crypto');

const transactionServices = {
    getTransaction: async (id, limit, offset) => {
        const res = await transactionRepo.getTransaction(id, limit, offset)
        return res
    },

    postTransaction: async (req) => {
        try {
            const userId = req.user.id
            const serviceCode = req.body.service_code

            const res = await fetch(process.env.INFORMATION_SERVICE_URL, {
                headers : {
                     'Authorization': req.headers.authorization
                }
            })
            if (!res.ok) {
                const errorText = await res.text();
                return { error: `gagal mengfetching data dari services. HTTP ${res.status}: ${errorText}` }
            }

            const data = await res.json()
            const service = data.data.find(s => s.service_code === serviceCode)

             if (!service) {
                return { error: 'gagal service ataau layanan tidak ditemukan' }
            }

            const balance = await balanceRepo.getBalance(userId)
            if (balance.balance < service.service_tariff) {
                return { error: 'gagal balance kurang mohon topup dulu' }
            }

            const newBalance = balance.balance - service.service_tariff
            await balanceRepo.updateBalance(userId, newBalance)

            const invoice = `INV-${randomUUID().substring(0, 8).toUpperCase()}`;

            const description = service.service_name

            const transaction = await transactionRepo.postTransaction({
                description: description,
                invoice_number: invoice,
                id_user: userId,
                service_code: service.service_code,
                service_name: service.service_name,
                transaction_type: 'PAYMENT',
                total_amount: service.service_tariff
            })
            return { transaction, newBalance }
        } catch (err) {
            console.error('Transaction error:', err)
            return { error: err.message }
        }
           

        
    }
}

module.exports = transactionServices