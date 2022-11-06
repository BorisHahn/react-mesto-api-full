import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmationPopup({
  isOpen,
  onClose,
  isLoading,
  card,
  onDeleteClick,
}) {
  function handleDeleteClick(e) {
    e.preventDefault();
    onDeleteClick(card);
  }

  return (
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Удаление..." : "Да"}
      onSubmit={handleDeleteClick}
    />
  );
}

export default ConfirmationPopup;
