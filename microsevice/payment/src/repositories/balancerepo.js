const pool = require('../config/db')

const balanceRepo = {
    createBalance: async (id) =>{
        const result = await pool.query(
            'INSERT INTO BALANCE (id_user, balance) VALUES ($1,$2) RETURNING balance',[id, 0]
        );
        return result.rows[0]
    },

    getBalance: async (id) => {
        const result = await pool.query(
            'SELECT balance FROM BALANCE WHERE id_user = $1',[id]
        );
        return result.rows[0]
    },

    updateBalance: async (id, values) => {
        const result = await pool.query(
            'UPDATE BALANCE SET balance = $1, updated_at = NOW() WHERE id_user = $2 RETURNING balance',[values,id]
        );
        return result.rows[0]
    }
}

module.exports = balanceRepo