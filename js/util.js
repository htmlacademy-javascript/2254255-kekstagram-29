/**
 * Функция для проверки, является ли нажатая клавиша Escape.
 * @param {key} evt - нажатая клавиша
 * @return {boolean} - если клавиша Escape, возвращает true, иначе false
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export {isEscapeKey};
