import {SCALE_STEP, SCALE_MIN_VALUE, SCALE_MAX_VALUE, SCALE_DEFAULT_VALUE, sliderEffects} from './const-settings.js';

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomValue = document.querySelector('.scale__control--value');
const userPhoto = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderEffectsList = document.querySelector('.effects__list');
const effectValueElement = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');

/**
 * Функция по преобразованию получаемого значения
 * @param {number} value - получаемое значение
 */
function scalePhoto(value) {
  userPhoto.style.transform = `scale(${value / 100})`;
  zoomValue.value = `${value}%`;
}

/**
 * Функция по уменьшению фото при клике
 */
function onZoomOutButton() {
  scalePhoto(Math.max(parseInt(zoomValue.value, 10) - SCALE_STEP, SCALE_MIN_VALUE));
}

/**
 * Функция по увеличению фото при клике
 */
function onZoomInButton() {
  scalePhoto(Math.min(parseInt(zoomValue.value, 10) + SCALE_STEP, SCALE_MAX_VALUE));
}

/**
 * Функция по изменению фильтров слайдера
 * @param {object} effect - имя выбраного фильтра
 * @param {object} value - значение ползунка выбраного фильтра
 * @param {object} unit - единица измерения выбраного фильтра, по умолчанию отсутствует
 */
function changeSliderFilters(effect, value, unit = '') {
  effectValueElement.value = value;
  userPhoto.style.filter = `${effect}(${value}${unit})`;
}

/**
 * Функция по отображению слайдера
 * @param {object} effects - имя выбраного фильтра
 */
function showSlider(effects) {
  sliderContainer.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    start: effects.max,
    step: effects.step,
    connect: 'lower',
    range: {
      min: effects.min,
      max: effects.max
    },
  });
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
}

/**
 * Функция для сброса эффектов фильтра
 */
function resetSliderEffects() {
  sliderContainer.classList.add('hidden');
  userPhoto.style.filter = '';
  effectValueElement.value = '';
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
}

/**
 * Функция по изменению эффектов при использовании бегунка
 * @param {click} evt - объект события
 */
function onChangeEffect (evt) {
  resetSliderEffects();
  const effects = sliderEffects[evt.target.value];
  if (effects.name !== 'none') {
    showSlider(effects);
  }
}

/**
 * Функция для запуска работы кнопок масштабирования и слайдера
 */
function initSliderAndScale() {
  sliderEffectsList.addEventListener('change', onChangeEffect);
  zoomOutButton.addEventListener('click', onZoomOutButton);
  zoomInButton.addEventListener('click', onZoomInButton);
}

/**
 * Функция возвращающая размер фото и значение фильтра по умолчанию
 */
function resetUserPhotoEffects() {
  resetSliderEffects();
  scalePhoto(SCALE_DEFAULT_VALUE);
  sliderEffectsList.removeEventListener('change', onChangeEffect);
  zoomOutButton.removeEventListener('click', onZoomOutButton);
  zoomInButton.removeEventListener('click', onZoomInButton);
}

export {initSliderAndScale, resetUserPhotoEffects};
