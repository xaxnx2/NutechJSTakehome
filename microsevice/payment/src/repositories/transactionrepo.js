const pool = require('../config/db')

const transactionRepo = {
    getTransaction: async (id, limit, offset) => {
        const result = await pool.query(
                'SELECT invoice_number, transaction_type, description, total_amount, created_at FROM TRANSACTION WHERE id_user = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',[id, limit, offset]
            );
        return result.rows
    },

    postTransaction: async (fields) => {
        const keys = Object.keys(fields)
        const values = Object.values(fields)
        const setClause = keys.map((_, i) => `$${i + 1}`).join(', ');
        
        const result = await pool.query(
            `INSERT INTO TRANSACTION (${keys.join(', ')}) VALUES (${setClause}) RETURNING invoice_number, service_code, service_name, transaction_type, total_amount, created_at`,values
        )
        return result.rows[0]
    }
}

module.exports = transactionRepo