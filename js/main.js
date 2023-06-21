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
const AvatarRange = {
  MIN: 1,
  MAX: 6
};
const LikesAmount = {
  MIN: 15,
  MAX: 200
};
const CommentsAmount = {
  MIN: 0,
  MAX: 30
};

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

const getPhotoId = getIdGenerator();
const getCommentId = getIdGenerator(getRandomInteger(0, 100), getRandomInteger(0, 100));

function createComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhotoDescription() {
  const photoId = getPhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesAmount.MIN, LikesAmount.MAX),
    comments: Array.from({length: getRandomInteger(CommentsAmount.MIN, CommentsAmount.MAX)}, createComment),
  };
}

function createPhotoDescriptions(photoAmount) {
  return Array.from({length: photoAmount}, createPhotoDescription);
}

createPhotoDescriptions(PHOTO_AMOUNT);
