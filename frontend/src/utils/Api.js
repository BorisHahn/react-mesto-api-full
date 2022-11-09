class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._config = { headers: options.headers };
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", this._config).then((res) =>
      this._getResponseData(res)
    );
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", this._config).then((res) =>
      this._getResponseData(res)
    );
  }

  setUserData(body) {
    const config = Object.assign(
      { body: JSON.stringify(body), method: "PATCH" },
      this._config
    );
    return fetch(this._baseUrl + "/users/me", config).then((res) =>
      this._getResponseData(res)
    );
  }

  addNewCard(body) {
    const config = Object.assign(
      { body: JSON.stringify(body), method: "POST" },
      this._config
    );
    return fetch(this._baseUrl + "/cards", config).then((res) =>
      this._getResponseData(res)
    );
  }

  deleteCard(id) {
    const config = Object.assign({ method: "DELETE" }, this._config);
    return fetch(this._baseUrl + `/cards/${id}`, config).then((res) =>
      this._getResponseData(res)
    );
  }

  changeLikeCardStatus(id, isLike) {
    const config = Object.assign(
      { method: isLike ? "PUT" : "DELETE" },
      this._config
    );
    return fetch(this._baseUrl + `/cards/${id}/likes`, config).then((res) =>
      this._getResponseData(res)
    );
  }

  setNewAvatar(body) {
    const config = Object.assign(
      { body: JSON.stringify(body), method: "PATCH" },
      this._config
    );
    return fetch(this._baseUrl + "/users/me/avatar", config).then((res) =>
      this._getResponseData(res)
    );
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  setToken(token) {
    this._config.headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api({
  baseUrl: "https://api.gaidukevich.mesto.nomoredomains.icu",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default api;
