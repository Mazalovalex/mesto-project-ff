// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  // Клонируем шаблон карточки
  const cardFragment = cardTemplate.cloneNode(true); // Клонируем шаблон
  const cardElement = cardFragment.querySelector(".places__item"); // Получаем элемент карточки
  console.log("Создана карточка:", cardElement); // Логируем созданную карточку в консоль

  // Находим заголовок и изображение
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  // Устанавливаем заголовок, изображение, текст для альтернативного описания карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Находим кнопку удаления
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Проверяем наличие кнопки и добавляем обработчик клика
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement); // Удаляем карточку напрямую
  });

  // Возвращаем готовую карточку
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  console.log("Удаляем элемент:", cardElement); // Логируем элемент в консоль
  cardElement.remove(); // Удаляем элемент
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  placesList.append(card);
});

// Подсказки для меня нужны. Надеюсь вам они не сильно помешали.
