import { removeCard } from "./api";
// Создание карточки
function createCard(
  cardData,
  onDelete,
  userId,
  cardTemplate,
  clickedCard,
  likeButtonFun
) {
  // Клонируем шаблон карточки из DOM
  const cardFragment = cardTemplate.cloneNode(true);
  console.log(cardFragment);

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

  // console.log("userId: ", userId);
  // console.log("cardData.owner._id: ", cardData.owner._id);

  if (userId !== cardData.owner._id) {
    // deleteButton.classList.add("card__delete-hide");
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", function () {
      onDelete(cardElement, cardData._id);
    });
  }

  // Добавляем обработчики событий
  deleteButton.addEventListener("click", function () {
    onDelete(cardElement);
  });

  cardImage.addEventListener("click", function () {
    clickedCard(cardData);
  });

  likeButton.addEventListener("click", likeButtonFun);

  return cardElement;
}

// Удаление карточки
function deleteCard(cardElement, id) {
  removeCard(id).then(function (data) {
    cardElement.remove();
  });
}

// Обработка лайка
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLikeButton };
