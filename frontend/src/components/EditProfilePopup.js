import React from "react";
import { useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__name-input popup__input"
        id="name-input"
        name="name"
        type="text"
        value={name}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__job-input popup__input"
        id="job-input"
        name="description"
        type="text"
        value={description}
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
