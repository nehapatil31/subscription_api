const { idleCount } = require('../database');
const pool = require('../database');

const addSubscription = (req, res) => {
  const { user_name: username, plan_id, start_date } = req.body;
  console.log(
    `INSERT INTO subscriptions(user_name,plan_id,start_date) VALUES ('${username}','${plan_id}',TO_TIMESTAMP('${start_date}','YYYY-MM-DD'))`
  );
  pool.query(
    `INSERT INTO subscriptions(user_name,plan_id,start_date) 
    VALUES ('${username}','${plan_id}',TO_TIMESTAMP('${start_date}','YYYY-MM-DD'))`,
    (error, results) => {
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
    }
  );
};

const getSubscription = (req, res) => {
  const username = req.params.username;
  pool.query(
    'SELECT * FROM get_subscription($1)',
    [username],
    (error, results) => {
      if (error) {
        res.status(503).json({
          error: 'Database connectivity issue',
        });
        throw error;
      }
      res.status(200).json({
        status: 'SUCCESS',
        data: results.rows[0].get_subscription.data,
      });
    }
  );
};

const getSubscriptionWithDate = (req, res) => {
  const username = req.params.username;
  const date = req.params.date;
  pool.query(
    `SELECT * FROM get_subscription('${username}','${date}')`,
    (error, results) => {
      if (error) {
        res.status(503).json({
          error: 'Database connectivity issue',
        });
        throw error;
      }
      res.status(200).json({
        status: 'SUCCESS',
        data: results.rows[0].get_subscription.data,
      });
    }
  );
};

module.exports = { addSubscription, getSubscription, getSubscriptionWithDate };
