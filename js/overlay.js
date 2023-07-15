import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const hashtagsText = uploadForm.querySelector('.text__hashtags');
const commentText = uploadForm.querySelector('.text__description');

/**
 * Функция для закрытия подложки при нажатии клавиши Escape, если фокус не на поле хештега или комментария.
 * @param {key} evt - нажатая клавиша
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!(hashtagsText === document.activeElement || commentText === document.activeElement)) {
      closeOverlay();
    }
  }
}

/**
 * Функция для закрытия подложки при клике на кнопку закрытия.
 */
function onCloseButtonClick() {
  closeOverlay();
}

/**
 * Функция для открытия подложки.
 */
function openOverlay() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  uploadInput.removeEventListener('change', openOverlay);
}

/**
 * Функция для закрытия подложки.
 */
function closeOverlay() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  uploadInput.addEventListener('change', openOverlay);
}

/**
 * Функция для запуска работы с подложкой.
 */
function overlayScript() {
  uploadInput.addEventListener('change', openOverlay);
}

export {overlayScript};
