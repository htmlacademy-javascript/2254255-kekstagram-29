const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const DESCRIPTIONS = [
  'Передо мной интересная фотография.',
  'Передо мной удивительная фотография.',
  'Передо мной забавная фотография.',
  'Передо мной необычная фотография.',
  'Фотография не загрузилась, но описать её надо...',
];

/**
 * Функция для генерации случайного целого числа из заданного диапазона.
 * @param {number} min - Минимальное значение
 * @param {number} max - Максимальное значение
 * @return {number} - Случайное целое число в диапазоне от min до max
 */
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/**
 * Функция для генерации случайного элемента из заданного массива.
 * @param {Object[]} elements - Массив из которого нужно выбрать элемент
 * @return {*} - Случайный элемент из массива elements
 */
function getRandomArrayElement (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

/**
 * Функция для генерации последовательных уникальных целых чисел.
 * @param {number} start - Начальное значение, по умолчанию равно 0
 * @return {number} - Уникальное целое число, последовательно увеличивающееся на 1
 */
function getUniqueInteger (start = 0) {
  let integer = start;
  return function () {
    return integer++;
  };
}

const photoId = getUniqueInteger();
const photoUrl = getUniqueInteger();
const commentId = getUniqueInteger(getRandomInteger(1, Infinity));

function createComment () {
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhotoDescription () {
  return {
    id: photoId,
    url: `photos/${photoUrl}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: '',
  };
}
