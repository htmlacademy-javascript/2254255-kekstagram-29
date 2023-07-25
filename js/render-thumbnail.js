import {RANDOM_THUMBNAILS_AMOUNT, FilterType} from './const-settings.js';
import {openFullSizePhoto} from './full-size.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');
const thumbnailFilter = document.querySelector('.img-filters');
let currentFilter = FilterType.DEFAULT;

/**
 * Функция для смены режимов фильтра.
 * @param {function} renderingThumbnails - генерация миниатюр
 */
function onClickFilter(renderingThumbnails) {
  thumbnailFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      const clickButton = evt.target;
      thumbnailFilter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickButton.classList.add('img-filters__button--active');
      currentFilter = clickButton.id;
      renderingThumbnails();
    }
  });
}

/**
 * Функция для сортировки миниатюр.
 * @param {Object[]} thumbnailA - Миниатюра, обязательно наличие ключей url, description, likes, comments
 * @param {Object[]} thumbnailB - Миниатюра, обязательно наличие ключей url, description, likes, comments
 */
function sortingThumbnails(thumbnailA, thumbnailB) {
  if (currentFilter === FilterType.RANDOM) {
    return Math.random() - 0.5;
  }
  if (currentFilter === FilterType.DISCUSSED) {
    return thumbnailB.comments.length - thumbnailA.comments.length;
  }
}

/**
 * Функция для ограничения количества миниатюр.
 */
function slicingThumbnails() {
  if (currentFilter === FilterType.RANDOM) {
    return RANDOM_THUMBNAILS_AMOUNT;
  }
}

/**
 * Функция для отрисовки миниатюр.
 * @param {Object[]} thumbnails - Массив данных о миниатюрах, обязательно наличие ключей url, description, likes, comments
 */
function renderThumbnails(thumbnails) {
  thumbnailContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnailFragment = document.createDocumentFragment();
  thumbnails
    .slice()
    .sort(sortingThumbnails)
    .slice(0, slicingThumbnails())
    .forEach(({url, description, likes, comments}) => {
      const templateClone = thumbnailTemplate.cloneNode(true);
      const templateCloneImg = templateClone.querySelector('.picture__img');
      templateCloneImg.src = url;
      templateCloneImg.alt = description;
      templateClone.querySelector('.picture__likes').textContent = likes;
      templateClone.querySelector('.picture__comments').textContent = comments.length;
      thumbnailFragment.append(templateClone);
      templateClone.addEventListener('click', () => {
        openFullSizePhoto({url, description, likes, comments});
      });
    });
  thumbnailContainer.append(thumbnailFragment);
}

/**
 * Функция запускает работу кнопок фильтров.
 * @param {function} renderingThumbnails - генерация миниатюр
 */
function showingFilteredThumbnails(renderingThumbnails) {
  thumbnailFilter.classList.remove('img-filters--inactive');
  onClickFilter(renderingThumbnails);
}

export {renderThumbnails, showingFilteredThumbnails};
