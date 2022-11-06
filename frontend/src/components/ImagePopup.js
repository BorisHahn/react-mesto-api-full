function ImagePopup({ card, onClose }) {
  const clazz = card.state
    ? `popup popup_image popup_opened`
    : `popup popup_image`;

  return (
    <div className={clazz}>
      <figure className="popup__container popup__container_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
