(()=>{"use strict";function e(e,t,n,o,r){var c=n.cloneNode(!0),d=c.querySelector(".places__item"),u=c.querySelector(".card__like-button"),a=d.querySelector(".card__delete-button"),p=d.querySelector(".card__title"),i=d.querySelector(".card__image");return p.textContent=e.name,i.src=e.link,i.alt=e.name,a.addEventListener("click",(function(){t(d)})),i.addEventListener("click",(function(){o(e)})),u.addEventListener("click",r),d}function t(e){e.remove()}function n(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",c),document.addEventListener("keydown",d)}function r(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}function c(e){e.target===e.currentTarget&&r(e.currentTarget)}function d(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var u=document.querySelector("#card-template").content,a=document.querySelector(".places__list"),p=document.querySelectorAll(".popup"),i=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_new-card"),_=document.querySelectorAll(".popup__close"),y=document.querySelector(".popup_type_image"),f=document.querySelector(".popup__image"),v=document.querySelector(".popup__caption"),k=document.forms["edit-profile"],q=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),g=k.querySelector('[name="name"]'),E=k.querySelector('[name="description"]'),L=document.forms["new-place"],h=L.elements["place-name"],x=L.elements.link,b=document.querySelector(".popup__form");function j(e){f.src=e.link,f.alt=e.name,v.textContent=e.name,o(y)}console.log(b),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o,t,u,j,n);a.append(r)})),i.addEventListener("click",(function(){g.value=q.textContent,E.value=S.textContent,o(s)})),k.addEventListener("submit",(function(e){e.preventDefault(),q.textContent=g.value,S.textContent=E.value,r(s)})),l.addEventListener("click",(function(){o(m)})),L.addEventListener("submit",(function(o){o.preventDefault();var c=e({name:h.value,link:x.value},t,u,j,n);a.prepend(c),L.reset(),r(m)})),_.forEach((function(e){e.addEventListener("click",(function(e){r(e.target.closest(".popup"))}))})),p.forEach((function(e){e.classList.add("popup_is-animated")}))})();