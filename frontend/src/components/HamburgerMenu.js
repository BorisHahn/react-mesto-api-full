import { Link, useHistory } from "react-router-dom";

function HamburgerMenu({
  loggedIn,
  userEmail,
  setUserEmail,
  hamburgerMenu,
  setHamburgerMenu,
  handleSetLoggedIn,
  setCards,
}) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
    setUserEmail({ email: "" });
    handleSetLoggedIn();
    setHamburgerMenu(false);
    setCards([]);
  }
  const clazz = `${
    hamburgerMenu && loggedIn
      ? "hamburger-menu_opened"
      : "hamburger-menu_closed"
  }`;
  const hamburger = loggedIn ? (
    <div className={clazz}>
      <p className="hamburger-menu__email">{loggedIn ? userEmail.email : ""}</p>
      <Link className="hamburger-menu__enter" onClick={signOut} to="/sign-in">
        Выйти
      </Link>
    </div>
  ) : (
    ""
  );
  return hamburger;
}

export default HamburgerMenu;
