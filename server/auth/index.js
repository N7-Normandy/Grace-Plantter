const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.get('/guest', async (req, res, next) => {
  try {
    console.log('THE SESSION: ', req.session);
    console.log('The session id: ', req.session.id);
    const user = await User.findOne({
      where: {
        sid: req.session.id,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
