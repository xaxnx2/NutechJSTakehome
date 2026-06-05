const pool = require('../config/db')

const bannerRepo = {
    getallbanners: async () => {
        const result = await pool.query('SELECT banner_name, banner_image, description FROM BANNERS');
        return result.rows;
    },

};

module.exports = bannerRepo