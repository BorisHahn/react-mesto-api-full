function InfoTooltip({ isOpen, onClose, message, image }) {
  const clazz = `popup ${isOpen && "popup_opened"}`;
  return (
    <div className={clazz}>
      <div className={"popup__container popup__container_info"}>
        <img className="popup__logo" src={image} alt="info pic"></img>
        <p className="popup__message">{message}</p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
