const cardRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateUserId,
  validateCard,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouter.get('/cards', auth, getCards);
cardRouter.post('/cards', auth, validateCard, createCard);
cardRouter.delete('/cards/:cardId', auth, validateUserId('cardId'), deleteCard);
cardRouter.put('/cards/:cardId/likes', auth, validateUserId('cardId'), likeCard);
cardRouter.delete('/cards/:cardId/likes', auth, validateUserId('cardId'), dislikeCard);

module.exports = cardRouter;
