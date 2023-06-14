// Функция для проверки длины строки.
function lengthCheck (string, maxLength) {
  return string.length <= maxLength;
}

// Функция для проверки, является ли строка палиндромом.
function palindromeCheck (phrase) {
  const normalise = phrase.toLowerCase().replaceAll(' ', '');
  let reversed = '';

  for (let i = 1; i <= normalise.length; i++) {
    reversed += normalise.at(-i);
  }

  return normalise === reversed;
}

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
function numberExtraction (sourse) {
  const normalise = sourse.toString().replaceAll(' ', '');
  let result = '';

  for (let i = 0; i < normalise.length; i++) {
    const symbol = Number(normalise[i]);
    if (Number.isNaN(symbol) === false) {
      result += symbol;
    }
  }

  return result;
}
