import { removeCard, addLike, removeLike } from "./api";

// Создание карточки
function createCard(
  cardData,
  onDelete,
  userId,
  cardTemplate,
  openImagePopup,
  handleLikeButton
) {
  // Клонируем шаблон карточки из DOM
  const cardFragment = cardTemplate.cloneNode(true);

  // Находим элементы карточки
  const cardElement = cardFragment.querySelector(".places__item");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Заполняем карточку данными
  cardTitle.textContent = cardData.name; // Название карточки
  cardImage.src = cardData.link; // Источник изображения карточки
  cardImage.alt = cardData.name; // Альт-текст для изображения
  likeCount.textContent = cardData.likes.length; // Количество лайков

  // Проверка, поставил ли текущий пользователь лайк
  const isLikeCard = cardData.likes.some(function (userLike) {
    return userLike["_id"] === userId;
  });

  // Если лайк уже поставлен, добавляем активный класс на кнопку лайка
  if (isLikeCard) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик клика по кнопке лайка
  likeButton.addEventListener("click", () => {
    handleLikeButton(likeButton, cardData._id, likeCount).catch((err) => {
      console.error("Ошибка при обработке лайка:", err);
      alert("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
    });
  });

  // Условие для скрытия кнопки удаления, если текущий пользователь не является владельцем
  if (userId !== cardData.owner._id) {
    deleteButton.classList.add("card__delete-hide");
  } else {
    // Обработчик клика по кнопке удаления (удаляет карточку)
    deleteButton.addEventListener("click", function () {
      onDelete(cardElement, cardData._id);
    });
  }

  // Обработчик клика по изображению (открывает попап с изображением)
  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  return cardElement; // Возвращаем созданный элемент карточки
}

// Удаление карточки
function deleteCard(cardElement, id) {
  removeCard(id)
    .then(function (data) {
      cardElement.remove(); // Удаляем карточку из DOM после успешного удаления на сервере
    })
    .catch(function (err) {
      console.error("Ошибка при удалении карточки:", err); // Логируем ошибку
      alert("Не удалось удалить карточку. Пожалуйста, попробуйте снова."); // Сообщение пользователю
    });
}

// Обработка лайка
function handleLikeButton(button, id, countElement) {
  const isLiked = button.classList.contains("card__like-button_is-active");

  if (isLiked) {
    // Если лайк уже поставлен, то снимаем лайк
    return removeLike(id)
      .then(function (data) {
        button.classList.remove("card__like-button_is-active"); // Убираем активный класс
        countElement.textContent = data.likes.length; // Обновляем количество лайков
      })
      .catch(function (err) {
        console.error("Ошибка при удалении лайка:", err);
        alert("Не удалось снять лайк. Пожалуйста, попробуйте позже.");
      });
  } else {
    // Если лайк не поставлен, то ставим лайк
    return addLike(id)
      .then(function (data) {
        button.classList.add("card__like-button_is-active"); // Добавляем активный класс
        countElement.textContent = data.likes.length; // Обновляем количество лайков
      })
      .catch(function (err) {
        console.error("Ошибка при добавлении лайка:", err);
        alert("Не удалось поставить лайк. Пожалуйста, попробуйте позже.");
      });
  }
}

export { createCard, deleteCard, handleLikeButton };
