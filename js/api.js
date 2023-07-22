import {GET_URL, POST_URL, Method, ErrorText} from './const-settings.js';

/**
 * Функция загрузки данных
 * @param {string} route - путь
 * @param {string} errorText - текст ошибки
 * @param {string} method - метод отправки, по умолчанию GET
 * @param {*} body - полезные данные, по умолчанию null
 * @return данные в формате JSON
 */
async function load(route, errorText, method = Method.GET, body = null) {
  let response;

  try {
    response = await fetch(route, {method, body});
    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (err) {
    throw new Error(errorText);
  }

  return await response.json();
}

/**
 * Функция для получение данных с сервера
 * @return данные в формате JSON
 */
function getData() {
  return load(GET_URL, ErrorText.GET_DATA);
}

/**
 * Функция для отправки данных на сервер, форму отправляем POST
 * @param {*} body - полезые данные
 */
function sendData(body) {
  return load(POST_URL, ErrorText.SEND_DATA, Method.POST, body);
}

export {getData, sendData};
