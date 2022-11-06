const cardRouter = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/card');
const {
  validCreateCardData,
  validateCardId,
} = require('../utils/validation/validCardData');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.post('/', validCreateCardData, createCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
