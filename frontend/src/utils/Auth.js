export async function register(email, password) {
  try {
    const result = await fetch("https://auth.nomoreparties.co/signup", {
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
    const result = await fetch("https://auth.nomoreparties.co/signin", {
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
    const result = await fetch(`https://auth.nomoreparties.co/users/me`, {
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
