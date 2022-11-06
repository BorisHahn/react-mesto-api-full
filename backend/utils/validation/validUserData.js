const { celebrate, Joi } = require('celebrate');
const { URL_REG } = require('../const');

module.exports.validGetByIdData = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validRegData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REG),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validEditUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validEditAvatarData = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REG),
  }),
});

module.exports.validLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
