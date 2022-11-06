import { Link, withRouter } from "react-router-dom";
import { useState } from "react";

function Register({ handleRegister }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userInfo;
    handleRegister(email, password);
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit}>
      <h2 className="reg-form__title">Регистрация</h2>
      <input
        name="email"
        className="reg-form__input"
        placeholder="Email"
        type="email"
        autoComplete="none"
        minLength="5"
        maxLength="40"
        value={userInfo.email}
        onChange={handleChange}
        required
      ></input>
      <input
        name="password"
        className="reg-form__input"
        placeholder="Пароль"
        type="password"
        autoComplete="none"
        minLength="8"
        value={userInfo.password}
        onChange={handleChange}
        required
      ></input>
      <button className="reg-form__submit">Зарегестрироваться</button>
      <p className="reg-form__question">
        Уже зарегестрированы?{" "}
        <Link className="reg-form__enter" to="/sign-in">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default withRouter(Register);
