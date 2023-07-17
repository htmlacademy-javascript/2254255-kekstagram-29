import {SCALE_STEP, SCALE_MIN_VALUE, SCALE_MAX_VALUE, SCALE_DEFAULT_VALUE} from './const-settings.js';

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomValue = document.querySelector('.scale__control--value');
const userPhoto = document.querySelector('.img-upload__preview img');

/**
 * Функция по преобразованию получаемого значения
 * @param {number} value получаемое значение
 */
function scalePhoto(value) {
  userPhoto.style.transform = `scale(${value / 100 })`;
  zoomValue.value = `${value}%`;
}

/**
 * Функция по уменьшению фото при клике
 */
function onZoomOutButton() {
  scalePhoto(Math.max(parseInt(zoomValue.value, 10) - SCALE_STEP, SCALE_MIN_VALUE));
}

/**
 * Функция по увеличению при клике
 */
function onZoomInButton() {
  scalePhoto(Math.min(parseInt(zoomValue.value, 10) + SCALE_STEP, SCALE_MAX_VALUE));
}

function resetScale() {
  scalePhoto(SCALE_DEFAULT_VALUE);
}

function initScale() {
  zoomOutButton.addEventListener('click', onZoomOutButton);
  zoomInButton.addEventListener('click', onZoomInButton);
}

export {resetScale, initScale};
