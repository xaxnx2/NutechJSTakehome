const pool = require('../config/db')

const servicesRepo = {
    getallservices: async () => {
        const result = await pool.query('SELECT service_code, service_name, service_icon, service_tariff FROM SERVICES');
        return result.rows;
    },

};

module.exports = servicesRepo