// Создание карточки
function createCard(
  cardData,
  onDelete,
  cardTemplate,
  clickedCard,
  likeButtonFun
) {
  // Клонируем шаблон карточки из DOM
  const cardFragment = cardTemplate.cloneNode(true);

  // Находим элементы карточки
  const cardElement = cardFragment.querySelector(".places__item");
  const likeButton = cardFragment.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  // Заполняем карточку данными
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

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
function deleteCard(cardElement) {
  cardElement.remove(); 
}

// Обработка лайка
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active"); 
}



export { createCard, deleteCard, handleLikeButton }; 