const balanceRepo = require('../repositories/balancerepo')

const balanceServices = {
    createBalance: async (id) => {
        const balance = await balanceRepo.createBalance(id)
        return balance
    },

    getBalance: async (id) => {
        const balance = await balanceRepo.getBalance(id)
        return balance
    },

    updateBalance: async (id, value) => {
        const currbalance = await balanceRepo.getBalance(id)
        let newbalance = currbalance.balance + value
        const balance = await balanceRepo.updateBalance(id, newbalance)
        return balance
    },
}

module.exports = balanceServices