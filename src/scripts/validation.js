// Функция для отображения ошибки валидации
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`); // Найдем элемент ошибки, связанный с текущим полем ввода
  const { inputErrorClass, errorClass } = validationConfig;

  inputElement.classList.add(inputErrorClass); // Добавим класс с ошибкой к самому полю ввода
  formError.textContent = errorMessage; // Установим текст ошибки
  formError.classList.add(errorClass); // Сделаем ошибку видимой
}

// Функция для скрытия ошибки валидации
function hideInputError(formElement, inputElement, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`); // Найдем элемент ошибки, связанный с текущим полем ввода
  const { inputErrorClass, errorClass } = validationConfig;

  inputElement.classList.remove(inputErrorClass); // Удалим класс с ошибкой у поля ввода
  formError.classList.remove(errorClass); // Скрываем элемент ошибки
  formError.textContent = ""; // Удалим текст ошибки
}

// Функция для проверки валидности поля ввода
function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

//Проверяем валидность всех полей! Если одно поле будет не валидно вернет true
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// Добавляем класс к кнопке если хоть одно в поле в функции не валидно
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true; //делаем кнопку неактивной, и пользователь не может ее нажать.
    buttonElement.classList.add(inactiveButtonClass); // Перекрасили кнопку
  } else {
    buttonElement.disabled = false; // делаем кнопку активной, и пользователь может ее нажать.
    buttonElement.classList.remove(inactiveButtonClass); // удаляем класс перекраски
  }
};

// Функция добавляет слушатели событий для всех полей ввода формы
const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // Преобразуем NodeList в массив для удобства работы
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // Добавим обработчик события input для каждого поля ввода
      isValid(formElement, inputElement, validationConfig); // Проверяем валидность поля при вводе данных
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Основная функция для активации валидации на всех формах
export const enableValidation = (validationConfig) => {
  const { formSelector } = validationConfig;

  const formElements = Array.from(document.querySelectorAll(formSelector)); // Найдем все формы на странице
  const formList = Array.from(formElements); // Преобразуем NodeList в массив для удобства работы

  formList.forEach((currentForm) => {
    setEventListeners(currentForm, validationConfig);
  }); // Для каждой формы запускаем установку слушателей
};

export function clearValidation(formElement, validationConfig) {
  const { inputSelector, inactiveButtonClass, submitButtonSelector } =
    validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(function (currentInput) {
    hideInputError(formElement, currentInput, validationConfig);
  });
  buttonElement.classList.add(inactiveButtonClass);
}

// const {
//   formSelector,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass,
// } = validationConfig;
