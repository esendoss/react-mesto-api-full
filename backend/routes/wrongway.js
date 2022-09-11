const wayRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

wayRouter.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

module.exports = wayRouter;
