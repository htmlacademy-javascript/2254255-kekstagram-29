import {isEscapeKey, isAcceptableValue} from './util.js';

const MAX_HASHTAGS = 5;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsText = uploadOverlay.querySelector('.text__hashtags');
const commentText = uploadOverlay.querySelector('.text__description');

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
 * Функция проверки введия невалидного хэш-тега
 * @param {string} value - текущее значение поля
 * @return {boolean} - перебираем хэш-теги на заданные условия, возвращаем true или false
 */
function validateInvalidHashtag(value) {
  return normalizeHashtags(value).every((tag) => isAcceptableValue(tag));
}

/**
 * Функция проверки превышено количество хэш-тегов
 * @param {string} value - текущее значение поля
 * @return {boolean} - перебираем хэш-теги на заданные условия, возвращаем true или false
 */
function validateNumberOfHashtags(value) {
  return normalizeHashtags(value).length <= MAX_HASHTAGS;
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
 * Функция для закрытия запуска валидации pristine.
 * @param {submit} evt - отправка формы
 */
function onFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

/**
 * Функция для запуска валидации.
 */
function addPristineValidation() {
  uploadForm.addEventListener('submit', onFormSubmit);
  pristine.addValidator(hashtagsText, validateNumberOfHashtags, `нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`);
  pristine.addValidator(hashtagsText, validateInvalidHashtag, 'недопустимый хэш-тег');
  pristine.addValidator(hashtagsText, validateRepeatedHashtags, 'хэш-теги не должны повторяться');
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
 * Функция для открытия подложки.
 */
function onFormChange() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
}

/**
 * Функция для закрытия подложки.
 */
function closeOverlay() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  pristine.reset();
  uploadForm.reset();
}

/**
 * Функция для запуска работы с подложкой.
 */
function addInputListenerAndValidation() {
  uploadInput.addEventListener('change', onFormChange);
  addPristineValidation();
}

export {addInputListenerAndValidation};
