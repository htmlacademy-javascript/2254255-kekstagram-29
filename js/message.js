import {isEscapeKey} from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorCloseButton = errorMessage.querySelector('.error__button');
const successCloseButton = successMessage.querySelector('.success_button');
let message;

/**
 * функция для закрытия сообщения с помощью клавиатуры
 * @param {object} evt объект события
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

/**
 * функция для закрытия сообщения при клике по документу
 * @param {object} evt объект события
 */
const onBodyClick = (evt) => {
  if (!(evt.target === message)) {
    closeMessage();
  }
};

/**
 * функция закрытия сообщения
 */
function closeMessage () {
  message.remove();
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * общая функция по показу сообщения
 * @param {*} messageElement сообщение
 * @param {*} closeBtnClass класс кнопки
 */
const showMessage = (messageElement, closeButton) => {
  message = messageElement.cloneNode(true);
  document.body.append(message); //добавляем элемент
  document.addEventListener('click', onBodyClick); //добавит обработчик событий при клике вне сообщеня окна
  document.addEventListener('keydown', onDocumentKeydown); // добавит обработчик событий при нажатии на клавишу
  closeButton.addEventListener('click', closeMessage); //закрытие сообщения
};

/**
 * функция по показу сообщения об успешной загрузки изображения
 */
const showSuccessMessage = () => {
  showMessage(successMessage, successCloseButton);
};

/**
 * функция по показу сообщения с ошибкой загрузки изображения
 */
const showErrorMessage = () => {
  showMessage(errorMessage, errorCloseButton);
};

export {showSuccessMessage, showErrorMessage};
