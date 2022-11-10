const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { login, createUser } = require('../controllers/user');
const { validRegData, validLoginData } = require('../utils/validation/validUserData');

// роуты, не требующие авторизации
router.post('/signin', validLoginData, login);
router.post('/signup', validRegData, createUser);

// роуты, которым авторизация нужна
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router;
