import {isEscapeKey} from './util.js';

const fullSizePhoto = document.querySelector('.big-picture');
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');

/**
 * Функция для закрытия полноразмерной фотографии при нажатии клавиши Escape.
 * @param {key} evt - нажатая клавиша
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}

/**
 * Функция для закрытия полноразмерной фотографии при клике на кнопку закрытия.
 */
function onCloseButtonClick() {
  closeFullSizePhoto();
}

/**
 * Функция для добавления созданных комментариев на страницу.
 * @param {Object[]} comments - массив комментариев
 */
function renderComments(comments) {
  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
}

/**
 * Функция для открытия полноразмерной фотографии.
 * @param {Object[]} url, likes, description, comments - массив миниатюр с обязательными ключами url, likes, description, comments
 */
function openFullSizePhoto({url, likes, description, comments}) {
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  fullSizePhoto.querySelector('.big-picture__img img').src = url;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.comments-count').textContent = comments.length;
  renderComments(comments);
  fullSizePhoto.querySelector('.social__caption').textContent = description;
}

/**
 * Функция для закрытия полноразмерной фотографии.
 */
function closeFullSizePhoto() {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
}

export {openFullSizePhoto};
