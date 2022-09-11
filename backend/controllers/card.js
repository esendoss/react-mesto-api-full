const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const UncorrectError = require('../errors/UncorrectError');
const DeleteCardError = require('../errors/DeleteCardError');
const ErrorCode = require('../errorCode/errorCode');
//  возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(ErrorCode.ERROR_CODE_200).send(cards))
    .catch((err) => next(err));
};

// создаёт карточку

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(ErrorCode.ERROR_CODE_200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
//  удаляет карточку по идентификатору
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new DeleteCardError('Отсутствуют права на удаление'));
      }
      return card.remove()
        .then(() => res.status(ErrorCode.ERROR_CODE_200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

//  поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(ErrorCode.ERROR_CODE_200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UncorrectError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(ErrorCode.ERROR_CODE_200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UncorrectError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
