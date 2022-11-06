function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
}) {
  const clazz = `popup ${isOpen && "popup_opened"}`;
  return (
    <div className={clazz}>
      <form
        className={`popup__container popup__container_${name}`}
        onSubmit={onSubmit}
      >
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        {children}
        <button className="popup__submit" type="submit">
          {buttonText}
        </button>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
