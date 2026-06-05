const pool = require('../config/db')

const userRepo = {
    findByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM USERS WHERE email = $1', [email]);
        return result.rows[0];
    },

    findByID: async (id) => {
        const result = await pool.query('SELECT first_name, last_name, email, profile_image FROM USERS WHERE id = $1',[id]);
        return result.rows[0];
    },

    create: async ({first_name,last_name, email, password}) => {
        const result = await pool.query(
            'INSERT INTO USERS (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id,first_name, last_name, email, profile_image',
            [first_name,last_name,email,password]
        );
        return result.rows[0]
    },

    update: async (id, fields) => {
        const keys = Object.keys(fields)
        const values = Object.values(fields)
        const setClause = keys.map((key,i) => `${key} = $${i + 1}`).join(', ')
        const result = await pool.query(
            `UPDATE USERS SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING first_name, last_name, email, profile_image`,
            [...values,id]
        );
        return result.rows[0]
    },

     updateProfileImage: async (id, profileImage) => {
        const result = await pool.query(
            'UPDATE users SET profile_image = $1, updated_at = NOW() WHERE id = $2 RETURNING first_name, last_name, email, profile_image',
            [profileImage, id]
        );
        return result.rows[0];
    },
};

module.exports = userRepo