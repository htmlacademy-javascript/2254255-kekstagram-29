const COMMENTS_MODIFIER = 5;
const HASHTAGS_LIMIT = 5;
const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_DEFAULT_VALUE = 100;
const ERROR_TIMEOUT = 5000;
const POST_URL = 'https://29.javascript.pages.academy/kekstagram';
const GET_URL = `${POST_URL}/data`;
const DEBOUNCE_TIMEOUT = 500;
const RANDOM_THUMBNAILS_AMOUNT = 10;
const EXTENSIONS = ['.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp',];

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const ValidationMessages = {
  OUTNUBER: `нельзя указать больше ${HASHTAGS_LIMIT} хэш-тегов`,
  INVALID: 'недопустимый хэш-тег',
  SIMILAR: 'хэш-теги не должны повторяться',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};
const CloseButton = {
  ERROR: '.error__button',
  SUCCESS: '.success__button',
};

const sliderEffects = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

export {COMMENTS_MODIFIER, HASHTAGS_LIMIT, SCALE_STEP, SCALE_MIN_VALUE, SCALE_MAX_VALUE, SCALE_DEFAULT_VALUE, ERROR_TIMEOUT, POST_URL, GET_URL, DEBOUNCE_TIMEOUT, RANDOM_THUMBNAILS_AMOUNT, EXTENSIONS, FilterType, ValidationMessages, Method, ErrorText, SubmitButtonText, CloseButton, sliderEffects};
