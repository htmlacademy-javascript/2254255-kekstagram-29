const MILLISECONDS_PER_MINUTE = 60000;

/**
 * Функция для проверки возможности проведения встречи.
 * @param {string} startOfDay - Время начала рабочего дня
 * @param {string} endOfDay - Время завершения рабочего дня
 * @param {string} startOfMeeting - Время начала встречи
 * @param {number} lengthOfMeeting - Продолжительность встречи в минутах
 * @return {boolean} - Проверка возможности проведения встречи
 */
function scheduleCheck(startOfDay, endOfDay, startOfMeeting, lengthOfMeeting) {
  const normalize = '2022-02-24 ';
  if (new Date(normalize.concat(startOfDay)) <= new Date(normalize.concat(startOfMeeting))) {
    return new Date(normalize.concat(endOfDay)) - new Date(normalize.concat(startOfMeeting)) >= lengthOfMeeting * MILLISECONDS_PER_MINUTE;
  }
  return false;
}

export {scheduleCheck};
