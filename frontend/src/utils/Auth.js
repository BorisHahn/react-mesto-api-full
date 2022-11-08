import api from "../utils/Api";
// const URL = "https://api.gaidukevich.mesto.nomoredomains.icu"
const URL = "http://localhost:3000"

export async function register(email, password) {
  try {
    const result = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    console.error(e);
  }
  return Promise.reject("Ошибка отправки запроса");
}

export async function authorize(email, password) {
  try {
    const result = await fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (result.ok) {
      return result.json().then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          api.setToken(data.token);
          return data;
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
  return Promise.reject("Ошибка отправки запроса");
}

export async function getContent(token) {
  try {
    const result = await fetch(`${URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.json().then((data) => data);
  } catch (e) {
    console.error(e);
  }
}
