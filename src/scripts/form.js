const form = document.querySelector('#myForm');
const sendBtn = document.querySelector('.checkin');
const emails = ['ivanov@mail.ru', 'petrov@yandex.ru', 'zuev@inbox.ru'];
const emailError = document.querySelector('.email__error');

form.addEventListener('submit', e => {
  e.preventDefault();

  const password = form.elements.password;
  const email = form.elements.email;
  const agreement = form.elements.agreement;

  if(password.value === '') {
    addFormMessage(password, 'Поле не может быть пустым')
  } else if (password.value.length<4) {
    addFormMessage(password, 'Пароль должен быть не менее 4 символов');
  }

  if(email.value === '') {
    addFormMessage(email, 'Поле не может быть пустым')
  } else if(!validateEmail(email.value)) {
    addFormMessage(email, 'Не корректный почтовый адрес')
  } 

  for(var i=0; i<emails.length; i++ ){
    if(email.value === emails[i]) {
      emailError.style.display='flex';
    }
  }
  
  if(!agreement.checked) {
    addFormMessage(agreement, 'Требуется подтверждение')
  }
});

// при фокусе на инпут убираем класс ошибки
[...form.elements].forEach((input) => {
  input.addEventListener('focus', e => {
    let elem = e.currentTarget.parentElement;

    let messElem = elem.querySelector('.form__error');
    if(messElem) {
      elem.removeChild(messElem);
    }

    elem.classList.remove('form__row_error');

    if(emailError) {
      emailError.style.display='none';
    }
  });
  
  agreement.addEventListener('change', e => {
    let elem = e.currentTarget.parentElement;

    let messElem = elem.querySelector('.form__error');
    if(messElem) {
      elem.removeChild(messElem);
    }

    elem.classList.remove('form__row_error');
  });
});

// добавляем (создаем) блок-сообщение об ошибке
function addFormMessage(elem, message) {
  let parrent = elem.parentElement;

  let messageContainer = document.createElement('div');
  messageContainer.classList.add('form__error');
  messageContainer.innerHTML = message;
  parrent.appendChild(messageContainer);

  parrent.classList.add('form__row_error');
}

// валидация email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}