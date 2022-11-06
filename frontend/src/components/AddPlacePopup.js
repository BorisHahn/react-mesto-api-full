import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__name-input popup__input"
        id="imgName-input"
        name="name"
        value={name}
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        autoComplete="off"
        onChange={handleAddName}
        required
      />
      <span className="popup__input-error imgName-input-error"></span>
      <input
        className="popup__link-input popup__input"
        id="url-input"
        name="link"
        value={link}
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        onChange={handleAddLink}
        required
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
