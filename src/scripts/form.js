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
    addFormMessage(password, 'Используйте не менее 4 символов');
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

    const nowError = elem.querySelector('.form__error_active');

    if(nowError) {
     nowError.classList.remove('form__error_active');
    }

    elem.classList.remove('form__row_error');
  });

  // если checkbox в состоянии checked убираем класс ошибки
  agreement.addEventListener('change', e => {
    let elem = e.currentTarget.parentElement;

    const nowError = elem.querySelector('.form__error_active');

    if(nowError) {
     nowError.classList.remove('form__error_active');
    }
    elem.classList.remove('form__row_error');
  });

  // при фокусе на инпут убираем класс ошибки о существовании email
  email.addEventListener('focus', e => {

    if(emailError) {
      emailError.style.display='none';
    }
  });
});

// добавляем блок-сообщение об ошибке
function addFormMessage(elem, message) {
  let parrent = elem.parentElement;
  const curError = parrent.querySelector('.form__error');

  curError.classList.add('form__error_active');
  curError.innerHTML = message;

  parrent.classList.add('form__row_error');
}

// валидация email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}