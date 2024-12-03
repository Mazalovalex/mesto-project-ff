import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./scripts/cards"; // импорт данных карточек
import { createCard, deleteCard, handleLikeButton } from "./scripts/card"; // импорт функций для работы с карточками
import { openModal, closeModal } from "./scripts/modal"; // импорт функций для открытия и закрытия модальных окон
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  fetchUserData,
  fetchCardsData,
  editUserProfile,
  addNewCard,
  updateUserAvatar,
} from "./scripts/api";

// DOM создание контейнера для карточек и массива всех модальных окон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const modalWindows = document.querySelectorAll(".popup");

// DOM элементы для открытия и закрытия попапов
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addProfileButton = document.querySelector(".profile__add-button");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");

// DOM элементы для карточки и попапа с изображением
const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");
const cardPopupCaption = document.querySelector(".popup__caption");

// DOM элементы для формы редактирования профиля
const profileAvatar = document.querySelector(".profile__image");
const profileEditForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormNameInput = profileEditForm.querySelector('[name="name"]');
const profileFormDescriptionInput = profileEditForm.querySelector(
  '[name="description"]'
);

// DOM элементы Avatar
const newAvatarButton = document.querySelector(".profile__image-edit-button");
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");
const newAvatarForm = document.forms["new-avatar"];
const newAvatarInput = newAvatarForm.elements.link;

// DOM элементы для добавления новой карточки
const newCardFormPopup = document.forms["new-place"];
const newCardFormInputName = newCardFormPopup.elements["place-name"];
const newCardFormInputLink = newCardFormPopup.elements.link;

//Выносим все необходимые элементы формы в константы (7.val)
const formElement = document.querySelector(".popup__form");
const inputElement = document.querySelector(".popup__input");
let myId = "";

const ValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Открытие попапа с изображением карточки
function handleClickedCard(cardData) {
  cardPopupImage.src = cardData.link;
  cardPopupImage.alt = cardData.name;
  cardPopupCaption.textContent = cardData.name;
  openModal(cardPopup);
}

// Выводим карточки на страницу
// initialCards.forEach((cardData) => {
//   const card = createCard(
//     cardData,
//     deleteCard,
//     cardTemplate,
//     handleClickedCard,
//     handleLikeButton
//   );
//   placesList.append(card);
// });

// Добавление новой карточки через форму
function handleAddNewCardForm(evt) {
  evt.preventDefault();

  const button = newCardFormPopup.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  addNewCard(newCardFormInputName.value, newCardFormInputLink.value)
    .then(function (newCardData) {
      const card = createCard(
        newCardData,
        deleteCard,
        myId,
        cardTemplate,
        handleClickedCard,
        handleLikeButton
      );
      placesList.prepend(card);
      newCardFormPopup.reset();
      closeModal(addNewCardPopup);
    })

    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // Независимо от результата запроса текст кнопки вернется на "Сохранить"
    });
}

//   const newCard = {
//     name: newCardFormInputName.value,
//     link: newCardFormInputLink.value,
//   };

//   const card = createCard(
//     newCard,
//     deleteCard,
//     cardTemplate,
//     handleClickedCard,
//     handleLikeButton
//   );
//   placesList.prepend(card);
//   newCardFormPopup.reset();
//   closeModal(addNewCardPopup);
// }

// Сохранение изменений профиля
function handleProfileForm(evt) {
  evt.preventDefault();

  const button = profileEditForm.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  editUserProfile(profileFormNameInput.value, profileFormDescriptionInput.value)
    .then(function (userData) {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    // profileTitle.textContent = profileFormNameInput.value;
    // profileDescription.textContent = profileFormDescriptionInput.value;
    // closeModal(editProfilePopup);

    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // Независимо от результата запроса текст кнопки вернется на "Сохранить"
    });
}

function handleNewAvatarForm(evt) {
  evt.preventDefault();

  const button = newAvatarForm.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  updateUserAvatar(newAvatarInput.value)
    .then(function (userData) {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(newAvatarPopup);
      newAvatarForm.reset();
    })

    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // Независимо от результата запроса текст кнопки вернется на "Сохранить"
    });
}

// Открытие попапа редактирования профиля
editProfileButton.addEventListener("click", function () {
  profileFormNameInput.value = profileTitle.textContent;
  profileFormDescriptionInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, ValidationConfig);
  openModal(editProfilePopup);
});

// Открытие попапа добавления новой карточки
addProfileButton.addEventListener("click", function () {
  clearValidation(addNewCardPopup, ValidationConfig);
  openModal(addNewCardPopup);
});

// Обработчики для кнопок закрытия попапов
closeButtons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    const modal = evt.target.closest(".popup");
    closeModal(modal);
  });
});

// Добавляем анимацию для всех модальных окон
modalWindows.forEach(function (modalWindow) {
  modalWindow.classList.add("popup_is-animated");
});

// Открытие попапа для загрузки фотографии
newAvatarButton.addEventListener("click", function () {
  clearValidation(newAvatarForm, ValidationConfig);
  openModal(newAvatarPopup);
});

// Сохранение изменений профиля
profileEditForm.addEventListener("submit", handleProfileForm);

// Добавление новой карточки
newCardFormPopup.addEventListener("submit", handleAddNewCardForm);

// Сохранение нового аватара
newAvatarForm.addEventListener("submit", handleNewAvatarForm);

Promise.all([fetchUserData(), fetchCardsData()]).then(
  ([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    // console.log(userData._id)
    myId = userData._id;

    cardData.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        myId,
        cardTemplate,
        handleClickedCard,
        handleLikeButton
      );
      placesList.append(card);
    });
  }
);

enableValidation(ValidationConfig);
