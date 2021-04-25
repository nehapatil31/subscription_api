const pool = require('../database');

// Get all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.status(503).json({
        error: 'Database connectivity issue',
      });
      throw error;
    }
    res.status(200).json({
      status: 'SUCCESS',
      data: results.rows,
    });
  });
};

//Add user 
const addUser = (req, res) => {
  const username = req.params.username;
  pool.query(
    'INSERT INTO users(user_name,created_at) VALUES ($1, NOW()) RETURNING *',
    [username],
    (error, results) => {
      if (error) {
        res.status(503).json({
          error: 'Database connectivity issue',
        });
        throw error;
      }
      const addedData = results.rows[0];
      console.log(addedData);
      res.status(200).json({
        status: 'SUCCESS',
        data: {
          username: addedData.username,
          created_at: addedData.created_at
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, ''),
        },
      });
    }
  );
};

//Get single user
const getUser = (req,res)=>{
  const username = req.params.username;
  pool.query(
    `SELECT * FROM users WHERE user_name='${username}'`,
    (error, results) => {
      if (error) {
        res.status(503).json({
          error: 'Database connectivity issue',
        });
        throw error;
      }
      const addedData = results.rows[0];
      res.status(200).json({
        status: 'SUCCESS',
        data: {
          username: addedData.username,
          created_at: addedData.created_at
            .toISOString()
            .replace(/T/, ' '),
        },
      });
    }
  );
}


module.exports = { getUsers, addUser, getUser };
