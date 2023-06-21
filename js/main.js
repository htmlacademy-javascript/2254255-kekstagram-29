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
const PHOTO_AMOUNT = 25;

/**
 * Функция для генерации случайного целого числа из заданного диапазона.
 * @param {number} a - Минимальное или максимальное значение
 * @param {number} b - Минимальное или максимальное значение
 * @return {number} - Случайное целое число в диапазоне между a и b
 */
function getRandomInteger (a, b) {
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
function getRandomArrayElement (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const getPhotoId = (function(n) {
  return function() {
    n++;
    return n;
  };
}(0));
const getCommentId = (function(n) {
  return function() {
    n += getRandomInteger(0, 100);
    return n;
  };
}(getRandomInteger(0, 100)));

function createComment () {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhotoDescription () {
  const PhotoId = getPhotoId();
  return {
    id: PhotoId,
    url: `photos/${PhotoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
}

function photoDescriptions () {
  return Array.from({length: PHOTO_AMOUNT}, createPhotoDescription);
}

photoDescriptions();
