import { removeCard, addLike, removeLike } from "./api";
// Создание карточки
function createCard(
  cardData,
  onDelete,
  userId,
  cardTemplate,
  clickedCard,
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
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  const isLikeCard = cardData.likes.some(function (userLike) {
    return userLike["_id"] === userId;
  });

  if (isLikeCard) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    handleLikeButton(likeButton, cardData._id, likeCount);
  });

  if (userId !== cardData.owner._id) {
    deleteButton.classList.add("card__delete-hide");
  } else {
    deleteButton.addEventListener("click", function () {
      onDelete(cardElement, cardData._id);
    });
  }

  cardImage.addEventListener("click", function () {
    clickedCard(cardData);
  });

  return cardElement;
}

// Удаление карточки
function deleteCard(cardElement, id) {
  removeCard(id).then(function (data) {
    cardElement.remove();
  });
}

// Обработка лайка
function handleLikeButton(button, id, countElement) {
  const isLiked = button.classList.contains("card__like-button_is-active");

  if (isLiked) {
    // Если лайк уже поставлен, то снимаем лайк
    removeLike(id).then(function (data) {
      button.classList.remove("card__like-button_is-active");
      countElement.textContent = data.likes.length; // Обновляем количество лайков
    });
  } else {
    // Если лайк не поставлен, то ставим лайк
    addLike(id).then(function (data) {
      button.classList.add("card__like-button_is-active");
      countElement.textContent = data.likes.length; // Обновляем количество лайков
    });
  }
}

export { createCard, deleteCard, handleLikeButton };

// // Обработка лайка
// function handleLikeButton(evt, id, likeCount) {
// const likeButton = evt.target; // Получаем кнопку, на которую кликнули
// const isLiked = likeButton.classList.contains("card__like-button_is-active");

//   if (isLiked) {
//     removeLike(id).then(function (data) {
//       likeButton.classList.remove("card__like-button_is-active");
//       // likeCount.textContent = data.likes.length;
//     });
//   } else {
//     setLike(id).then(function (data) {
//       likeButton.classList.add("card__like-button_is-active");
//       // likeCount.textContent = data.likes.length;
//     });
//   }

//   // evt.target.classList.toggle("card__like-button_is-active");
//   console.log(isLiked);
// }

// // Обработка лайка
// function handleLikeButton(button, id, countElement) {
//   const isLiked = button.classList.contains("card__like-button_is-active");

//   likeCard(id, isLiked).then(function (data) {
//     button.classList.toggle("card__like-button_is-active");
//     countElement.textContent = data.likes.length;
//   });
// }
