/**
 * Функция для проверки, является ли нажатая клавиша Escape.
 * @param {key} evt - нажатая клавиша
 * @return {boolean} - если клавиша Escape, возвращает true, иначе false
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

/**
 * Функция для проверки правописания хэш-тегов.
 * @param {string} data - проверяемый хэш-тег
 * @return {boolean} - если хэш-тег написан правильно, возвращает true, иначе false
 */
function isAcceptableValue(data) {
  return /^#[a-zа-яё0-9]{1,19}$/i.test(data);
}

export {isEscapeKey, isAcceptableValue};
