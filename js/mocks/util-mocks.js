/**
 * Функция для генерации случайного целого числа из заданного диапазона.
 * @param {number} a - Минимальное или максимальное значение
 * @param {number} b - Минимальное или максимальное значение
 * @return {number} - Случайное целое число в диапазоне между a и b
 */
function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/**
 * Функция для генерации случайного элемента из заданного массива.
 * @param {Object[]} elements - Массив из которого нужно выбрать элемент
 * @return {*} - Случайный элемент из массива elements
 */
function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

/**
 * Функция для генерации уникального целого числа.
 * @param {number} start - Начальное значение, по умолчанию 0
 * @param {number} increment - Величина, на которую увеличится значение, по умолчанию 1
 * @return {number} - Число, увеличивающееся на величину increment при каждом вызове функции
 */
function getIdGenerator (start = 0, increment = 1) {
  let lastGeneratedId = start;

  return function () {
    lastGeneratedId += increment;
    return lastGeneratedId;
  };
}

export {getRandomInteger, getRandomArrayElement, getIdGenerator};
