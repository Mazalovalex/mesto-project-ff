// Открытие модального окна
function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened"); 
  modalElement.addEventListener("mousedown", handleCloseOverlay); 
  document.addEventListener("keydown", handleCloseEsc); 
}

// Закрытие модального окна
function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened"); 
  modalElement.removeEventListener("mousedown", handleCloseOverlay); 
  document.removeEventListener("keydown", handleCloseEsc); 
}

// Обработчик клика по оверлею
function handleCloseOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget); 
  }
}

// Обработчик нажатия клавиши Esc
function handleCloseEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened"); 
    closeModal(openPopup); 
  }
}

export { openModal, closeModal }; 