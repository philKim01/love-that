const User = require('../db/models/user');
const chalk = require('chalk');

const loggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('Not allowed!');
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loggedIn,
  isAdmin
};
