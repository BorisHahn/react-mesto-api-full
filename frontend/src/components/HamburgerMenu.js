import { Link, useHistory } from "react-router-dom";

function HamburgerMenu({ loggedIn, userEmail, handleLogin, setUserEmail, hamburgerMenu, setHamburgerMenu}) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
    handleLogin();
    setUserEmail({ email: "" });
    setHamburgerMenu(false);
  }
  const clazz = `${hamburgerMenu && loggedIn ? "hamburger-menu_opened" : "hamburger-menu_closed"}`;
  return (
    <div className={clazz}>
      <p className="hamburger-menu__email">{loggedIn ? userEmail.email : ""}</p>
      <Link className="hamburger-menu__enter" onClick={signOut} to="/sign-in">
        Выйти
      </Link>
    </div>
  );
}

export default HamburgerMenu;
