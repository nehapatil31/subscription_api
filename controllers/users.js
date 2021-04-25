const pool = require('../database');

// Get all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.status(503).json({
        "error": 'Database connectivity issue',
      });
      throw error;
    }
    res.status(200).json({
      status: 'SUCCESS',
      data: results.rows,
    });
  });
};

module.exports = { getUsers };
