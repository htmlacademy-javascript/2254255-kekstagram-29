import {ERROR_TIMEOUT, DEBOUNCE_TIMEOUT} from './const-settings.js';

/**
 * Функция для проверки, является ли нажатая клавиша Escape.
 * @param {key} evt - нажатая клавиша
 * @return {boolean} - если клавиша Escape, возвращает true, иначе false
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

/**
 * Функция для отрисовки сообщения об ошибке, которая показывается {ERROR_TIMEOUT} миллисекунд.
 * @param {string} message - текст ошибки
 */
function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff4e4e';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_TIMEOUT);
}

/**
 * Функция для устранения дребезга, источник - https://www.freecodecamp.org/news/javascript-debounce-example.
 * @param {function} callback - выполняемая функция
 * @param {number} timeoutDelay - применяемая задержка выполнения функции, по умолчанию {DEBOUNCE_TIMEOUT} миллисекунд
 */
function debounce (callback, timeoutDelay = DEBOUNCE_TIMEOUT) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, showAlert, debounce};
