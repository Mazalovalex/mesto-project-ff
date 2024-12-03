const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "6e993cbb-d7cd-4a04-b0f1-03771d114eac",
    "Content-Type": "application/json",
  },
};

//Загрузка информации о пользователе с сервера
export const fetchUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

//Загрузка карточек с сервера
export const fetchCardsData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

//Редактирование профиля
export const editUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

//Добавление новой карточки
export const addNewCard = (imageName, imageLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: imageName,
      link: imageLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

//Удаление карточки
export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }  
  });
};


// Постановка и снятие лайка
export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

// // Постановка и снятие лайка
// export const likeCard = (id, isLiked) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//     method: isLiked ? "DELETE" : "PUT",
//     headers: config.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//   });
// };

