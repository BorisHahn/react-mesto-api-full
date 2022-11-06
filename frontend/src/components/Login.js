import { withRouter } from "react-router-dom";
import { useState } from "react";

function Login({ handleLogin }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userInfo;
    handleLogin(email, password);
    setUserInfo({ email: "", password: "" });
  }
  return (
    <form className="log-form" onSubmit={handleSubmit}>
      <h2 className="log-form__title">Вход</h2>
      <input
        name="email"
        className="log-form__input"
        placeholder="Email"
        type="email"
        minLength="5"
        maxLength="40"
        value={userInfo.email}
        onChange={handleChange}
        required
      ></input>
      <input
        name="password"
        className="log-form__input"
        placeholder="Пароль"
        type="password"
        minLength="8"
        value={userInfo.password}
        onChange={handleChange}
        required
      ></input>
      <button className="log-form__submit">Войти</button>
    </form>
  );
}

export default withRouter(Login);
