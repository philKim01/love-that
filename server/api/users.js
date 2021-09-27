const router = require('express').Router();
const {
  models: { User }
} = require('../db');
const { loggedIn, isAdmin } = require('./gatekeepingMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    });
    if (!users) {
      next({ status: 500, message: 'Database query failed.' });
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
