const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UncorrectError = require('../errors/UncorrectError');
const EmailError = require('../errors/EmailError');
const ErrorCode = require('../errorCode/errorCode');

//  загрузка всех пользователей из бд
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.status(ErrorCode.ERROR_CODE_200).send(user);
    })
    .catch(next);
};

//  загрузка пользователя по id
module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(ErrorCode.ERROR_CODE_200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UncorrectError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// создаем пользователя

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.status(ErrorCode.ERROR_CODE_201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectError('Некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new EmailError({ message: 'err.errMessage' }));
      } else {
        next(err);
      }
    });
};

//  обновляет профиль
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(ErrorCode.ERROR_CODE_200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

//  обновляет аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(ErrorCode.ERROR_CODE_200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ message: 'Авторизация прошла успешно', token });
    })
    .catch(next);
};
