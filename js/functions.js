/**
 * Функция для проверки длины строки.
 * @param {string} string - Проверяемая строка
 * @param {number} maxLength - Максимальная длина
 * @return {boolean} - Проверяет, что длина строки меньше, либо равна максимальной длине
 */
function lengthCheck(string, maxLength) {
  return string.length <= maxLength;
}

lengthCheck('Функция для проверки длины строки', 21);

/**
 * Функция для проверки, является ли строка палиндромом.
 * @param {string} phrase - Проверяемая строка
 * @return {boolean} - Проверяет, что что строка является палиндромом (обратный порядок символов совпадает с прямым)
 */
function palindromeCheck(phrase) {
  const normalize = phrase.toLowerCase().replaceAll(' ', '');
  let reversed = '';

  for (let i = 1; i <= normalize.length; i++) {
    reversed += normalize.at(-i);
  }

  return normalize === reversed;
}

palindromeCheck('Функция для проверки, является ли строка палиндромом');

/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * @param {string || number} source - Проверяемая строка
 * @return {boolean} - Извлекает из строки цифры и возвращает их в виде целого положительного числа
 */
function numberExtraction(source) {
  const normalize = source.toString().replaceAll(' ', '');
  let result = '';

  for (let i = 0; i < normalize.length; i++) {
    const symbol = Number(normalize[i]);
    if (Number.isNaN(symbol) === false) {
      result += symbol;
    }
  }

  return result;
}

numberExtraction('Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа');
