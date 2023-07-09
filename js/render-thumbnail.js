import {openFullSizePhoto} from './full-size.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

/**
 * Функция для отрисовки миниатюр.
 */
function renderThumbnails(thumbnails) {
  const thumbnailFragment = document.createDocumentFragment();
  thumbnails.forEach(({url, description, likes, comments}) => {
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

export {renderThumbnails};
