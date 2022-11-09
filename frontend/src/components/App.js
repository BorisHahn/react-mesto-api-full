import React from "react";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import success from "../../src/images/success.svg";
import error from "../../src/images/error.svg";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import HamburgerMenu from "./HamburgerMenu";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ state: false, link: "" });
  const [selectedBox, setSelectedBox] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [enter, setEnter] = useState(false);
  const [userEmail, setUserEmail] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((studentsCards) => {
          setCards([...cards, ...studentsCards]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleSetLoggedIn() {
    setLoggedIn(false);
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((crd) => (crd._id === card._id ? newCard : crd))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleHamburgeMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((res) => {
          setCurrentUser({ ...res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleBoxClick = (item) => {
    setSelectedBox(item);
  };

  const handleCardClick = (item) => {
    setSelectedCard({
      state: true,
      link: item.link,
      name: item.name,
    });
  };

  const handleUpdateUser = (body) => {
    setIsLoading(true);
    api
      .setUserData(body)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (body) => {
    setIsLoading(true);
    api
      .setNewAvatar(body)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeletePlaceClick = () => {
    setIsConfirmPopupOpen(true);
  };

  const handleInfoTooltipClick = () => {
    setTimeout(() => {
      setIsInfoTooltipPopupOpen(true);
    }, 500);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ state: false, link: "" });
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.state ||
    isConfirmPopupOpen ||
    isInfoTooltipPopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setEnter(true);
          setMessage("Вы успешно зарегестрировались!");
          handleInfoTooltipClick();
          history.push("/sign-in");
        }
      })
      .catch((e) => {
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
        setEnter(false);
        handleInfoTooltipClick();
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setUserEmail({ email });
          setLoggedIn(!loggedIn);
          setEnter(true);
          setMessage("Вы успешно выполнили вход!");
          handleInfoTooltipClick();
          history.push("/");
        }
      })
      .catch((e) => {
        setEnter(false);
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
        handleInfoTooltipClick();
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            const email = res.email;
            setLoggedIn(!loggedIn);
            setUserEmail({ email });
            history.push("/");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <HamburgerMenu
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleLogin={handleLogin}
          setUserEmail={setUserEmail}
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
          handleSetLoggedIn={handleSetLoggedIn}
          setCards={setCards}
        />
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleSetLoggedIn={handleSetLoggedIn}
          setUserEmail={setUserEmail}
          hamburgerMenu={hamburgerMenu}
          handleHamburgeMenu={handleHamburgeMenu}
          setCards={setCards}
        />
        <main className="main">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onBoxClick={handleBoxClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeletePlaceClick}
              component={Main}
            />

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ConfirmationPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
        card={selectedBox}
        onDeleteClick={handleCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        loggedIn={loggedIn}
        isOpen={isInfoTooltipPopupOpen}
        message={message}
        image={enter ? success : error}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
