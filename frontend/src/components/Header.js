import logo from "../images/logo.svg";
import { Link, useLocation, useHistory } from "react-router-dom";
import burger from "../../src/images/burger.svg";
import closeburger from "../../src/images/closeburger.svg";

function Header({ loggedIn, userEmail, handleSetLoggedIn, setUserEmail, hamburgerMenu, handleHamburgeMenu}) {
  const location = useLocation();
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
    handleSetLoggedIn();
    setUserEmail({ email: "" });
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />

      {loggedIn ? (
        <div className="header__info">
          <p className="header__email">{loggedIn ? userEmail.email : ""}</p>
          <Link className="header__enter" onClick={signOut} to="/sign-in">
            Выйти
          </Link>
          <img className="header__burger" src={hamburgerMenu ? closeburger : burger } alt="burger pic" onClick={handleHamburgeMenu}></img>
        </div>
      ) : location.pathname === "/sign-up" ? (
        <Link className="header__enter" to="/sign-in">
          Войти
        </Link>
      ) : (
        <Link className="header__enter" to="/sign-up">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
