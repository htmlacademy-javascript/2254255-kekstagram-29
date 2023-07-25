import {HASHTAGS_LIMIT, ValidationMessages, SubmitButtonText} from './const-settings.js';
import {isEscapeKey} from './util.js';
import {initSliderAndScale, resetUserPhotoEffects} from './user-photo-modify.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsText = uploadOverlay.querySelector('.text__hashtags');
const commentText = uploadOverlay.querySelector('.text__description');
const submitButton = uploadOverlay.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

/**
 * Функция для сбора хэш-тегов в нормализованный массив.
 * @param {string} tags - значение инпута
 * @return {Object[]} - массив хэш-тегов
 */
function normalizeHashtags(tags) {
  return tags.trim().toLowerCase().split(' ');
}

/**
 * Функция для проверки правописания хэш-тегов.
 * @param {string} data - проверяемый хэш-тег
 * @return {boolean} - если хэш-тег написан правильно, возвращает true, иначе false
 */
function isAcceptableValue(data) {
  return /^#[a-zа-яё0-9]{1,19}$/i.test(data);
}

/**
 * Функция проверки валидности хэш-тега
 * @param {string} value - текущее значение поля
 * @return {boolean} - перебираем хэш-теги на заданные условия, возвращаем true или false
 */
function validateInvalidHashtag(value) {
  if (value.length === 0) {
    return true;
  }
  return normalizeHashtags(value).every((tag) => isAcceptableValue(tag));
}

/**
 * Функция проверки числа хэш-тегов
 * @param {string} value - текущее значение поля
 * @return {boolean} - перебираем хэш-теги на заданные условия, возвращаем true или false
 */
function validateNumberOfHashtags(value) {
  return normalizeHashtags(value).length <= HASHTAGS_LIMIT;
}

/**
 * Функция проверки уникальности хэш-тегов
 * @param {string} value текущее значение поля
 * @return {boolean} - перебираем хэш-теги на заданные условия, возвращаем true или false
 */
function validateRepeatedHashtags(value) {
  const tagArray = normalizeHashtags(value);
  return tagArray.length === new Set(tagArray).size;
}

/**
 * Функция для запуска валидации.
 */
function addPristineValidation() {
  uploadForm.addEventListener('submit', onFormSubmit);
  pristine.addValidator(hashtagsText, validateNumberOfHashtags, ValidationMessages.OUTNUBER);
  pristine.addValidator(hashtagsText, validateInvalidHashtag, ValidationMessages.INVALID);
  pristine.addValidator(hashtagsText, validateRepeatedHashtags, ValidationMessages.SIMILAR);
}

/**
 * Функция для закрытия подложки при нажатии клавиши Escape, если фокус не на поле хэш-тега или комментария.
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
 * Функция для блокировки кнопки отправки фотографии.
 */
function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}

/**
 * Функция для разблокировки кнопки отправки фотографии.
 */
function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

/**
 * Функция для открытия подложки.
 */
function onFormChange() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  initSliderAndScale();
}

/**
 * Функция для закрытия подложки.
 */
function closeOverlay() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  resetUserPhotoEffects();
  pristine.reset();
  uploadForm.reset();
}

/**
 * Функция для отправки фотографии и сопутствующих данных на сервер.
 * @param {submit} evt - отправка формы
 */
async function onFormSubmit(evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      showSuccessMessage();
      closeOverlay();
    } catch {
      showErrorMessage();
    }
    unblockSubmitButton();
  }
}

/**
 * Функция для запуска работы с подложкой.
 */
function addOverlayListenersAndValidation() {
  uploadInput.addEventListener('change', onFormChange);
  addPristineValidation();
}

export {addOverlayListenersAndValidation};