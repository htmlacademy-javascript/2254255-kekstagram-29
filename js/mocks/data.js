import {getRandomInteger, getRandomArrayElement, getIdGenerator} from './util.js';

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

function createPhotoDescriptions(photoAmount = PHOTO_AMOUNT) {
  return Array.from({length: photoAmount}, createPhotoDescription);
}

export {createPhotoDescriptions};
