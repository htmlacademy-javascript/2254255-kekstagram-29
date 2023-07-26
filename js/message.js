import {isEscapeKey} from './util.js';

let message;

/**
 * Функция для закрытия сообщения с помощью клавиатуры.
 * @param {object} evt объект события
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

/**
 * Функция для закрытия сообщения при клике по документу.
 * @param {object} evt объект события
 */
function onBodyClick(evt) {
  if (evt.target === message) {
    closeMessage();
  }
}

/**
 * Функция для закрытия сообщения.
 */
function closeMessage() {
  message.remove();
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * Функция для открытия сообщения.
 * @param {Element} messageElement - шаблон сообщения
 * @param {string} closeButton - класс кнопки
 */
function showMessage(messageElement, closeButton) {
  message = messageElement.cloneNode(true);
  document.body.append(message);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  message.querySelector(closeButton).addEventListener('click', closeMessage);
}

export {showMessage};
