import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete, onBoxClick}) {

  const userInfo = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userInfo._id;
  const cardDeleteButtonClassName = (
    `card__delete ${!isOwn && 'card__delete_hide'}`
  );
  const isLiked = card.likes.some(i => i._id === userInfo._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete();
    onBoxClick(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-bar">
        <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
