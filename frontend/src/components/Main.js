import React from "react";
import editIcon from "../images/pen.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteClick,
  cards,
  onCardLike,
  onCardDelete,
  onBoxClick
}) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const cardsItem = cards.map((item) => {
    return (
      <Card
        card={item}
        onCardClick={onCardClick}
        onDeleteClick={onDeleteClick}
        key={item._id}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        onBoxClick={onBoxClick}
      />
    );
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__update-avatar" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <div className="profile__overlay">
            <img
              className="profile__edit-icon"
              src={editIcon}
              alt="Иконка редактирования"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__description">{currentUser.about}</h2>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="cards">
        {cardsItem}
      </ul>
    </main>
  );
}

export default Main;
