/**
 * Функция сортировки массива строк
 * Игнорирует пробелы при сравнении
 */
function sortStrings(arr) {
  return arr.slice().sort((a, b) => {
    const strA = a.replace(/\s+/g, '').toLowerCase();
    const strB = b.replace(/\s+/g, '').toLowerCase();
    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });
}

module.exports = sortStrings;
