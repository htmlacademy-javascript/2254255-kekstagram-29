/**
 * Функция для проверки возможности проведения встречи.
 * @param {string} startOfDay - Время начала рабочего дня
 * @param {string} endOfDay - Время завершения рабочего дня
 * @param {string} startOfMeeting - Время начала встречи
 * @param {number} lengthOfMeeting - Продолжительность встречи в минутах
 * @return {boolean} - Проверка возможности проведения встречи
 */
export function scheduleCheck(startOfDay, endOfDay, startOfMeeting, lengthOfMeeting) {
  const normalize = '2022-02-24 ';
  if (new Date(normalize.concat(startOfDay)) <= new Date(normalize.concat(startOfMeeting))) {
    return new Date(normalize.concat(endOfDay)) - new Date(normalize.concat(startOfMeeting)) >= lengthOfMeeting * 60000;
  }
  return false;
}
