const { celebrate, Joi } = require('celebrate');

const validation = (value, helpers) => {
  const linkRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!linkRegExp.test(value)) {
    return helpers.error('Ссылка не валидна');
  }
  return value;
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().required().length(24),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validation),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validation),
  }),
});

module.exports = {
  validateLogin,
  validateRegister,
  validateUserId,
  validateUser,
  validateAvatar,
  validateCard,
};
