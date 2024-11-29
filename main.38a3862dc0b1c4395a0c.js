(()=>{"use strict";function e(e,t,n,o,r){var c=n.cloneNode(!0),p=c.querySelector(".places__item"),u=c.querySelector(".card__like-button"),a=p.querySelector(".card__delete-button"),d=p.querySelector(".card__title"),i=p.querySelector(".card__image");return d.textContent=e.name,i.src=e.link,i.alt=e.name,a.addEventListener("click",(function(){t(p)})),i.addEventListener("click",(function(){o(e)})),u.addEventListener("click",r),p}function t(e){e.remove()}function n(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",c),document.addEventListener("keydown",p)}function r(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",c),document.removeEventListener("keydown",p)}function c(e){e.target===e.currentTarget&&r(e.currentTarget)}function p(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var u=document.querySelector("#card-template").content,a=document.querySelector(".places__list"),d=document.querySelectorAll(".popup"),i=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_new-card"),_=document.querySelectorAll(".popup__close"),y=document.querySelector(".popup_type_image"),v=document.querySelector(".popup__image"),f=document.querySelector(".popup__caption"),k=document.forms["edit-profile"],q=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),L=k.querySelector('[name="name"]'),g=k.querySelector('[name="description"]'),E=document.forms["new-place"],h=E.elements["place-name"],x=E.elements.link,b=(document.querySelector(".popup__form"),document.querySelector(".popup__input_type_name"));function j(e){v.src=e.link,v.alt=e.name,f.textContent=e.name,o(y)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o,t,u,j,n);a.append(r)})),i.addEventListener("click",(function(){L.value=q.textContent,g.value=S.textContent,o(s)})),k.addEventListener("submit",(function(e){e.preventDefault(),q.textContent=L.value,S.textContent=g.value,r(s)})),l.addEventListener("click",(function(){o(m)})),E.addEventListener("submit",(function(o){o.preventDefault();var c=e({name:h.value,link:x.value},t,u,j,n);a.prepend(c),E.reset(),r(m)})),_.forEach((function(e){e.addEventListener("click",(function(e){r(e.target.closest(".popup"))}))})),d.forEach((function(e){e.classList.add("popup_is-animated")})),b.addEventListener("input",(function(){popupInputTypeName.validity.valid?popupInputTypeName.classList.remove("form_input_type-error"):popupInputTypeName.classList.add("form_input_type-error")}))})();