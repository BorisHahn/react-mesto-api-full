import React from "react";
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__link-input popup__input"
        id="url-avatar-input"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error url-avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
