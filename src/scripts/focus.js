const form = document.querySelector('.form');
const sendBtn = document.querySelector('.checkin');


form.addEventListener('submit', e => {
  e.preventDefault();

const password = form.elements.password;
const email = form.elements.email;
// const message = form.elements.comment;

  if(password.value === '') {
    addFormMessage(name, 'Поле не может быть пустым')
  }
  if(email.value === '') {
    addFormMessage(email, 'Поле не может быть пустым')
  } else if(!validateEmail(email.value)) {
    addFormMessage(email, 'Не корректный почтовый адрес')
  }
  // if(message.value === '') {
  //   addFormMessage(message, 'Поле не может быть пустым')
  // }
});

// при фокусе на инпут убираем класс ошибки
[...form.elements].forEach((input) => {
  input.addEventListener('focus', e => {
    let elem = e.currentTarget.parentElement.parentElement;

    let messElem = elem.querySelector('.form__error');
    if(messElem) {
      elem.removeChild(messElem);
    }

    elem.classList.remove('form__row_error');
  });
});

// добавляем (создаем) блок-сообщение об ошибке
function addFormMessage(el, message) {
  let parrent = el.parentElement;

  let messageContainer = document.createElement('div');
  messageContainer.classList.add('form__error');
  messageContainer.innerHTML = message;
  parrent.appendChild(messageContainer);

  parrent.classList.add('form__row_error');
}

// валидация мыла
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// // // отправка формы
// // var ajaxForm = function (form) { // send request
// //   let formData = new FormData()
// //     formData.append('name', form.elements.name.value);
// //     formData.append('phone', form.elements.email.value);
// //     formData.append('comment', form.elements.comment.value);
// //     formData.append('to', "extra33333@mail.ru");

// //   let url = 'https://webdev-api.loftschool.com/sendmail/';

// //   const xhr = new XMLHttpRequest();
// //   xhr.responseType = 'json';
// //   xhr.open('POST', url);
// //   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
// //   xhr.send(formData);

// //   return xhr;
// // }

// // // создаем модалку
// // function createModal(content) {
// //   const container = document.createElement('div');
// //   container.className = 'popup';
// //   container.innerHTML = template;

// //   const contentBlock = container.querySelector('.popup__content');

// //   const closeBtn = container.querySelector('.popup__btn');
// //   closeBtn.innerText = 'ЗАКРЫТЬ';
// //   closeBtn.addEventListener('click', e => {
// //     document.body.removeChild(container);
// //   });

// //   const overlay = container.querySelector('.overlay');
// //   overlay.addEventListener('click', e => {
// //     if (e.target === overlay) {
// //       document.body.removeChild(container);
// //     }
// //   });

// //   return {
// //     open() {
// //       document.body.appendChild(container);
// //     },
// //     close() {
// //       document.body.removeChild(container);
// //     },
// //     setContent(content) {
// //       contentBlock.innerHTML = content;
// //     }
// //   };
// // }