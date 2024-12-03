// Импорт необходимых файлов и функций
import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./scripts/cards"; // импорт данных карточек
import { createCard, deleteCard, handleLikeButton } from "./scripts/card"; // импорт функций для работы с карточками
import { openModal, closeModal } from "./scripts/modal"; // импорт функций для открытия и закрытия модальных окон
import { enableValidation, clearValidation } from "./scripts/validation"; // импорт функций для валидации форм
import {
  fetchUserData,
  fetchCardsData,
  editUserProfile,
  addNewCard,
  updateUserAvatar,
} from "./scripts/api"; // импорт API функций для работы с сервером

// DOM создание контейнера для карточек и массива всех модальных окон
const cardTemplate = document.querySelector("#card-template").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список мест
const modalWindows = document.querySelectorAll(".popup"); // все попапы

// DOM элементы для открытия и закрытия попапов
const editProfileButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const editProfilePopup = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const addProfileButton = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки
const addNewCardPopup = document.querySelector(".popup_type_new-card"); // попап добавления карточки
const closeButtons = document.querySelectorAll(".popup__close"); // кнопки закрытия попапов

// DOM элементы для карточки и попапа с изображением
const cardPopup = document.querySelector(".popup_type_image"); // попап с изображением карточки
const cardPopupImage = document.querySelector(".popup__image"); // изображение в попапе
const cardPopupCaption = document.querySelector(".popup__caption"); // подпись изображения

// DOM элементы для формы редактирования профиля
const profileAvatar = document.querySelector(".profile__image"); // аватар профиля
const profileEditForm = document.forms["edit-profile"]; // форма редактирования профиля
const profileTitle = document.querySelector(".profile__title"); // название профиля
const profileDescription = document.querySelector(".profile__description"); // описание профиля
const profileFormNameInput = profileEditForm.querySelector('[name="name"]'); // поле для имени
const profileFormDescriptionInput = profileEditForm.querySelector('[name="description"]'); // поле для описания

// DOM элементы Avatar
const newAvatarButton = document.querySelector(".profile__image-edit-button"); // кнопка для изменения аватара
const newAvatarPopup = document.querySelector(".popup_type_new-avatar"); // попап для загрузки нового аватара
const newAvatarForm = document.forms["new-avatar"]; // форма для загрузки нового аватара
const newAvatarInput = newAvatarForm.elements.link; // поле ввода ссылки на новый аватар

// DOM элементы для добавления новой карточки
const newCardFormPopup = document.forms["new-place"]; // форма добавления карточки
const newCardFormInputName = newCardFormPopup.elements["place-name"]; // поле для названия нового места
const newCardFormInputLink = newCardFormPopup.elements.link; // поле для ссылки на изображение карточки

// Выносим все необходимые элементы формы в константы (для валидации)
const formElement = document.querySelector(".popup__form"); // форма
const inputElement = document.querySelector(".popup__input"); // входное поле
let myId = ""; // переменная для хранения ID пользователя

// Конфигурация валидации форм
const ValidationConfig = {
  formSelector: ".popup__form", // селектор формы
  inputSelector: ".popup__input", // селектор для инпутов
  submitButtonSelector: ".popup__button", // селектор кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // класс для неактивной кнопки
  inputErrorClass: "popup__input_type_error", // класс для поля с ошибкой
  errorClass: "popup__error_visible", // класс для видимой ошибки
};

// Добавление новой карточки через форму
function handleAddNewCardForm(evt) {
  evt.preventDefault(); // отмена стандартного поведения формы

  const button = newCardFormPopup.querySelector(".popup__button");
  button.textContent = "Сохранение..."; // изменение текста кнопки во время отправки

  addNewCard(newCardFormInputName.value, newCardFormInputLink.value) // отправка данных на сервер
    .then(function (newCardData) {
      const card = createCard(
        newCardData, 
        deleteCard,
        myId,
        cardTemplate,
        handleClickedCard,
        handleLikeButton
      );
      placesList.prepend(card); // добавление новой карточки в начало списка
      newCardFormPopup.reset(); // сброс формы
      closeModal(addNewCardPopup); // закрытие попапа
    })
    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err); // обработка ошибок
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // возвращение текста кнопки на исходное значение
    });
}

// Сохранение изменений профиля
function handleProfileForm(evt) {
  evt.preventDefault(); // отмена стандартного поведения формы

  const button = profileEditForm.querySelector(".popup__button");
  button.textContent = "Сохранение..."; // изменение текста кнопки

  editUserProfile(profileFormNameInput.value, profileFormDescriptionInput.value) // отправка данных на сервер
    .then(function (userData) {
      profileTitle.textContent = userData.name; // обновление имени профиля
      profileDescription.textContent = userData.about; // обновление описания профиля
      closeModal(editProfilePopup); // закрытие попапа
    })
    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // возвращение текста кнопки на исходное значение
    });
}

// Сохранение нового аватара
function handleNewAvatarForm(evt) {
  evt.preventDefault(); // отмена стандартного поведения формы

  const button = newAvatarForm.querySelector(".popup__button");
  button.textContent = "Сохранение..."; // изменение текста кнопки

  updateUserAvatar(newAvatarInput.value) // отправка нового аватара
    .then(function (userData) {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`; // обновление аватара
      closeModal(newAvatarPopup); // закрытие попапа
      newAvatarForm.reset(); // сброс формы
    })
    .catch(function (err) {
      console.error("Произошла ошибка при выполнении запроса:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    })
    .finally(function () {
      button.textContent = "Сохранить"; // возвращение текста кнопки на исходное значение
    });
}

// Открытие попапа с изображением карточки
function handleClickedCard(cardData) {
  cardPopupImage.src = cardData.link; // отображение изображения карточки
  cardPopupImage.alt = cardData.name; // добавление alt атрибута
  cardPopupCaption.textContent = cardData.name; // подпись под изображением
  openModal(cardPopup); // открытие попапа с изображением
}

// Открытие попапа редактирования профиля
editProfileButton.addEventListener("click", function () {
  profileFormNameInput.value = profileTitle.textContent; // заполнение формы текущими данными
  profileFormDescriptionInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, ValidationConfig); // очистка валидации
  openModal(editProfilePopup); // открытие попапа
});

// Открытие попапа добавления новой карточки
addProfileButton.addEventListener("click", function () {
  clearValidation(addNewCardPopup, ValidationConfig); // очистка валидации
  openModal(addNewCardPopup); // открытие попапа
});

// Обработчики для кнопок закрытия попапов
closeButtons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    const modal = evt.target.closest(".popup");
    closeModal(modal); // закрытие попапа
  });
});

// Добавляем анимацию для всех модальных окон
modalWindows.forEach(function (modalWindow) {
  modalWindow.classList.add("popup_is-animated"); // добавление класса анимации
});

// Открытие попапа для загрузки фотографии
newAvatarButton.addEventListener("click", function () {
  clearValidation(newAvatarForm, ValidationConfig); // очистка валидации
  openModal(newAvatarPopup); // открытие попапа для загрузки нового аватара
});

// Сохранение изменений профиля
profileEditForm.addEventListener("submit", handleProfileForm);

// Сохранение нового аватара
newAvatarForm.addEventListener("submit", handleNewAvatarForm);

// Сохранение новой карточки
newCardFormPopup.addEventListener("submit", handleAddNewCardForm);

// Валидация всех форм
enableValidation(ValidationConfig); // подключение валидации ко всем формам

// Загрузка данных пользователя и карточек с сервера
Promise.all([fetchUserData(), fetchCardsData()]) // параллельная загрузка данных
  .then(function ([userData, cardsData]) {
    profileTitle.textContent = userData.name; // отображение имени пользователя
    profileDescription.textContent = userData.about; // отображение описания
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`; // установка аватара пользователя

    myId = userData._id; // сохранение ID пользователя

    cardsData.forEach(function (cardData) {
      const card = createCard(
        cardData, // создание карточки
        deleteCard,
        myId,
        cardTemplate,
        handleClickedCard,
        handleLikeButton
      );
      placesList.append(card); // добавление карточки в список
    });
  })
  .catch(function (err) {
    console.error("Произошла ошибка при загрузке данных:", err); // обработка ошибок
    alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
  });


