import {createPhotoDescriptions} from './mocks/data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();
const createPictureDescriptions = createPhotoDescriptions();

createPictureDescriptions.forEach(({url, description, likes, comments}) => {
  const pictureClone = pictureTemplate.cloneNode(true);
  pictureClone.querySelector('.picture__img').src = url;
  pictureClone.querySelector('.picture__img').alt = description;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.append(pictureClone);
});

/**
 * Функция для отрисовки миниатюр.
 * @return {*} - Отрисовывает миниатюры с количеством комментариев и лайков
 */
function pictureCreation() {
  pictureContainer.append(pictureFragment);
}

export {pictureCreation};
