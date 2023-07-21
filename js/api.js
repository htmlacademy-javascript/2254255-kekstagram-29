import {GET_URL, POST_URL, Method, ErrorText} from './const-settings.js';

/**
 * Функция загрузки данных
 * @param {string} route - путь
 * @param {string} errorText - текст ошибки
 * @param {string} method - метод отправки, по умолчанию GET
 * @param {any} body - полезные данные, по умолчанию null
 * @returns данные в формате JSON
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
 */
async function getData() {
  return await load(GET_URL, ErrorText.GET_DATA);
}

/**
 * Функция для отправки данных на сервер, форму отправляем POST
 * @param {*} body - полезые данные
 */
async function sendData(body) {
  return await load(POST_URL, ErrorText.SEND_DATA, Method.POST, body);
}

export {getData, sendData};
